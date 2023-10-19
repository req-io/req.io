import './index.scss';
import Editor from "../Editor";
import Navbar from '../Navbar';

const EmptyPlaceholder = () => <div className='empty-placeholder'>No body required for GET requests!</div>;

const RequestPanel = (props: RequestPanelProps) => {
  const itemsConfig = [
    {
      name: 'body',
      label: 'Body',
      action: () => {},
      active: true
    },
    {
      name: 'headers',
      label: 'Headers',
      action: () => {},
      active: false
    },
  ];
  return (
    <div className='request-panel'>
      <Navbar items={itemsConfig}/>
      {
        props.method === 'GET'
          ? <EmptyPlaceholder/>
          : <Editor readOnly={ false } initialValue='{}' onValueChange={ props.onBodyChange }/>
      }
    </div>
  );
};

export default RequestPanel;
