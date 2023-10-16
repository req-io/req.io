import './index.scss'
import Editor from "../Editor";

const EmptyPlaceholder = () => <div className='empty-placeholder'>No response yet!</div>;

const ResponsePanel = (props: ResponsePanelProps) => {
  return (
    <div className='response-panel'>
      {
        props.response === ''
          ? <EmptyPlaceholder/>
          : <Editor initialValue={ props.response } readonly={ true }/>
      }
    </div>
  )
}

export default ResponsePanel