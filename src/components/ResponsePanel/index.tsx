import './index.scss';
import Editor from '../Editor';
import Spinner from '../Spinner';
import { useState } from 'react';
import Navbar from '../Navbar';
import { RawResponseViewerProps, ResponsePanelProps, StatusProps } from './types.ts';
import { NavbarItemComponentMap } from '../Navbar/types.ts';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SnackBar from '../Snackbar';

const getStatusClassName = (statusCode: number) => {
  if (statusCode >= 200 && statusCode < 300) {
    return 'success';
  }
  if (statusCode >= 300 && statusCode < 400) {
    return 'redirect';
  }
  if ((statusCode >= 400 && statusCode < 500) || statusCode === 0) {
    return 'client-error';
  }
  if (statusCode >= 500 && statusCode < 600) {
    return 'server-error';
  }
};

const EmptyPlaceholder = () => <div className="empty-placeholder">No response yet!</div>;

const RawResponseViewer = (props: RawResponseViewerProps) => {
  return <div className="raw-response">{props.response}</div>;
};

const Status = (props: StatusProps) => {
  const statusClassName = `status ${getStatusClassName(props.statusCode)}`;
  let statusMessage;
  const timeInSeconds = (props.statusTime / 1000).toFixed(2);
  if (props.statusCode === 0) statusMessage = `${props.statusText}  ${timeInSeconds}s`;
  else statusMessage = `${props.statusCode} ${props.statusText}  ${timeInSeconds}s`;

  return <div className={statusClassName}>{statusMessage}</div>;
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function isBlob(val: unknown): val is Blob {
  return (
    typeof Blob !== 'undefined' &&
    val instanceof Blob
  );
}

const ResponsePanel = (props: ResponsePanelProps) => {
  const [activeItem, setActiveItem] = useState('preview');
  const [isTextCopied, setIsTextCopied] = useState(false);
  const items = [
    { name: 'preview', label: 'Preview' },
    { name: 'raw', label: 'Raw' },
  ];

  const itemsConfig = items.map((item) => ({
    ...item,
    isActive: item.name === activeItem,
    onClick: () => setActiveItem(item.name),
  }));

  const navbarItemComponentMap: NavbarItemComponentMap = {
    preview: <Editor readOnly={true} initialValue={props.response} />,
    raw: <RawResponseViewer response={props.response} />,
  };

  const copyToClipboard = () => {
    props.response &&
      navigator.clipboard
        .writeText(props.response)
        .then(() => {
          setIsTextCopied(true);
          setTimeout(() => setIsTextCopied(false), 5000);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
  };

  let responseSize = 0;
  if (props.response) {
    if (typeof props.response === 'string') {
      responseSize = new TextEncoder().encode(props.response).length;
    } else if (isBlob(props.response)) {
      responseSize = (props.response as Blob).size;
    } else if (typeof props.response === 'object') {
      try {
        responseSize = new TextEncoder().encode(JSON.stringify(props.response)).length;
      } catch {
        responseSize = 0;
      }
    }
  }

  const isRequestCompleted = !(props.isNoRequestTriggered || props.isLoading);
  return (
    <div className="response-panel">
      <div className="response-panel-header">
        <Navbar items={itemsConfig} />
        {isRequestCompleted && (
          <div className="response-header-right">
            <Status statusCode={props.statusCode} statusText={props.statusText} statusTime={props.timeTaken}/>
            <span className="response-size" style={{ marginLeft: 12 }}>
              {formatSize(responseSize)}
            </span>
            <ContentCopyIcon fontSize="small" onClick={copyToClipboard} className="copyIcon" />
          </div>
        )}
      </div>
      {props.isLoading ? (
        <Spinner />
      ) : props.isNoRequestTriggered ? (
        <EmptyPlaceholder />
      ) : (
        navbarItemComponentMap[activeItem]
      )}
      {isTextCopied && (
        <SnackBar
          message={'Copied to clipboard'}
          vertical={'bottom'}
          horizontal={'right'}
          open={true}
        />
      )}
    </div>
  );
};

export default ResponsePanel;
