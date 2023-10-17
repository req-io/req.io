import './index.scss';
import Editor from "../Editor";

const EmptyPlaceholder = () => <div className='empty-placeholder'>No body required for GET requests!</div>;

const RequestPanel = ({ method }: RequestPanelProps) => {
  return (
    <div className='request-panel'>
      {
        method === 'GET'
          ? <EmptyPlaceholder/>
          : <Editor readOnly={false} initialValue='{}'/>
      }
    </div>
  );
};

export default RequestPanel;
