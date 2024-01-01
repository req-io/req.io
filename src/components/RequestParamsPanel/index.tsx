import './index.scss'
import { RequestParamsPanelProps } from "./types.ts";
import { Param } from "../RequestPanel/types.ts";
import EditableTable from "../EditableTable";
import { Column } from "../EditableTable/types.ts";


const RequestParamsPanel = (props: RequestParamsPanelProps) => {
  const onParamsChange = (id: number, updatedEntry: Param) => {
    const updatedParams = [ ...props.params ]
    updatedParams[id] = updatedEntry
    props.onParamsChange(updatedParams)
  }

  const onNewParamAddition = () => {
    props.onNewParamAddition({ key: '', value: '' })
  }

  const columns: Column[] = [
    { name: 'Key', selector: 'key', onChange: onParamsChange, placeholder: 'Param Key' },
    { name: 'Value', selector: 'value', onChange: onParamsChange, placeholder: 'Param Value' }
  ]

  return (
    <div className='request-params-panel'>
      <EditableTable columns={columns} data={props.params}/>
      <button className='button' onClick={onNewParamAddition}>Add Param</button>
    </div>
  )
}

export default RequestParamsPanel;