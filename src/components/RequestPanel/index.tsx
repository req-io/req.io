import Editor from "../Editor";
import './index.scss';

const EmptyPlaceholder = () => <div className='empty-placeholder'>No body required for GET requests!</div>;

const RequestPanel = ({ method }: RequestPanelProps) => {
  return (
    <div className='request-panel'>
      {
        method === 'GET'
          ? <EmptyPlaceholder/>
          : <Editor initialValue='{}' readonly={ false }/>
      }
    </div>
  );
};

export default RequestPanel;
