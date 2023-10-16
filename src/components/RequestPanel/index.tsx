import Editor from "../Editor";
import './index.scss';

const RequestPanel = () => {
  return <div className='request-panel'>
    <Editor initialValue='{}' readonly={false}/>
  </div>
}

export default RequestPanel;
