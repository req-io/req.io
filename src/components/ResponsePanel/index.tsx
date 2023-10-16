import './index.scss'
import Editor from "../Editor";

const ResponsePanel = (props: ResponsePanelProps) => {
  return (
    <div className='response-panel'>
      {
        props.response === ''
          ? <div className='response-placeholder'>Response will be shown here</div>
          : <Editor initialValue={ props.response } readonly={ true }/>
      }
    </div>
  )
}

export default ResponsePanel