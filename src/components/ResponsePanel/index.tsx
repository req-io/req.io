import './index.scss'
import Editor from "../Editor";

const EmptyPlaceholder = () => <div className='empty-placeholder'>No response yet!</div>;

const ResponsePanel = (props: ResponsePanelProps) => {
  console.log('response panel props---', props.response)
  return (
    <div className='response-panel'>
      {
        props.response === ''
          ? <EmptyPlaceholder/>
          : <Editor readOnly={true} initialValue={ props.response }/>
      }
    </div>
  )
}

export default ResponsePanel