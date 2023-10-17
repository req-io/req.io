import './index.scss';
import Editor from "../Editor";

const EmptyPlaceholder = () => <div className='empty-placeholder'>No body required for GET requests!</div>;

const RequestPanel = (props: RequestPanelProps) => {
  return (
    <div className='request-panel'>
      {
        props.method === 'GET'
          ? <EmptyPlaceholder/>
          : <Editor readOnly={ false } initialValue='{}' onValueChange={ props.onBodyChange }/>
      }
    </div>
  );
};

export default RequestPanel;
