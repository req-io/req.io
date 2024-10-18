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

  if (props.statusCode === 0) statusMessage = props.statusText;
  else statusMessage = `${props.statusCode} ${props.statusText}`;

  return <div className={statusClassName}>{statusMessage}</div>;
};

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

  const isRequestCompleted = !(props.isNoRequestTriggered || props.isLoading);
  return (
    <div className="response-panel">
      <div className="response-panel-header">
        <Navbar items={itemsConfig} />
        {isRequestCompleted && (
          <div className="response-header-right">
            <Status statusCode={props.statusCode} statusText={props.statusText} />
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
