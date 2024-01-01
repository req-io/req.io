import './index.scss'
import { RequestHeaderPanelProps } from "./types.ts";
import { Header } from "../RequestPanel/types.ts";
import EditableTable from "../EditableTable";
import { Column } from "../EditableTable/types.ts";


const RequestHeadersPanel = (props: RequestHeaderPanelProps) => {
  const onHeadersChange = (id: number, updatedEntry: Header) => {
    const updatedHeaders = [ ...props.headers ]
    updatedHeaders[id] = updatedEntry
    props.onHeadersChange(updatedHeaders)
  }

  const onNewHeaderAddition = () => {
    props.onNewHeaderAddition({ key: '', value: '' })
  }

  const columns: Column[] = [
    { name: 'Key', selector: 'key', onChange: onHeadersChange, placeholder: 'Header Key' },
    { name: 'Value', selector: 'value', onChange: onHeadersChange, placeholder: 'Header Value' }
  ]

  return (
    <div className='request-headers-panel'>
      <EditableTable columns={columns} data={props.headers}/>
      <button className='button' onClick={onNewHeaderAddition}>Add Header</button>
    </div>
  )
}

export default RequestHeadersPanel;