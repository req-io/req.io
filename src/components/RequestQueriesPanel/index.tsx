import './index.scss'
import { RequestQueriesPanelProps } from "./types.ts";
import { Query } from "../RequestPanel/types.ts";
import EditableTable from "../EditableTable";
import { Column } from "../EditableTable/types.ts";


const RequestQueriesPanel = (props: RequestQueriesPanelProps) => {
  const onQueriesChange = (id: number, updatedEntry: Query) => {
    const updatedQueries = [ ...props.query ]
    updatedQueries[id] = updatedEntry
    props.onQueryChange(updatedQueries)
  }

  const onNewQueryAddition = () => {
    props.onNewQueryAddition({ key: '', value: '' })
  }

  const columns: Column[] = [
    { name: 'Key', selector: 'key', onChange: onQueriesChange, placeholder: 'Query Key' },
    { name: 'Value', selector: 'value', onChange: onQueriesChange, placeholder: 'Query Value' }
  ]

  return (
    <div className='request-queries-panel'>
      <EditableTable columns={columns} data={props.query}/>
      <button className='button' onClick={onNewQueryAddition}>Add Query</button>
    </div>
  )
}

export default RequestQueriesPanel;