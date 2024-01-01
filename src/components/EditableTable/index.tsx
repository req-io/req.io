import React from 'react';
import './index.scss'
import { Column, DataEntry, EditableTableProps } from "./types.ts";

const EditableTable = (props: EditableTableProps) => {
  const tableRows = props.data.map((item: DataEntry, index: number) => {
    const tableCells = props.columns.map((column) => {
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const updatedEntry = { ...item }
        updatedEntry[column.selector] = value
        column.onChange(index, updatedEntry)
      }

      return (
        <td>
          <input type='text' placeholder={column.placeholder} value={item[column.selector]} onChange={onChange}/>
        </td>
      )
    })
    return <tr>{...tableCells}</tr>
  })

  const tableHeader = <tr>{...props.columns.map((column: Column) => (<th>{column.name}</th>))}</tr>

  return (
    <table className='table'>
      {tableHeader}
      {...tableRows}
    </table>
  )
}

export default EditableTable;