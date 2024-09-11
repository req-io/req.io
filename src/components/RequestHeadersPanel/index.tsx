import './index.scss'
import React from "react";
import { RequestHeaderPanelProps } from "./types.ts";
import { Header } from "../RequestPanel/types.ts";

const RequestHeadersPanel = (props: RequestHeaderPanelProps) => {
  const changeHeaders = (id: number, updatedHeader: Header) => {
    const updatedHeaders = [ ...props.headers ]
    updatedHeaders[id] = updatedHeader
    props.onHeadersChange(updatedHeaders)
  }

  const addNewHeader = () => {
    props.onHeadersChange([...props.headers, { key: '', value: '' }])
  }

  const deleteHeader = (id: number) => {
    const updatedHeaders = [...props.headers]
    updatedHeaders.splice(id, 1)
    props.onHeadersChange([...updatedHeaders])
  }

  const headerRows = props.headers.map((header: Header, index) => {
    const onHeaderKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      changeHeaders(index, { ...header, key: e.target.value })
    }

    const onHeaderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      changeHeaders(index, { ...header, value: e.target.value })
    }

    const onHeaderDeletion = () => {
      deleteHeader(index)
    }

    return (
      <tr>
        <td><input type='text' placeholder='Header Key' value={ header.key } onChange={ onHeaderKeyChange }/></td>
        <td><input type='text' placeholder='Header Value' value={ header.value } onChange={ onHeaderValueChange }/></td>
        <td><button onClick={onHeaderDeletion}>x</button></td>
      </tr>
    )
  })
  return (
    <div className='request-headers-panel'>
      <table className='headers-table'>
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th></th>
        </tr>
        { ...headerRows }
      </table>
      <button className='button' onClick={ addNewHeader }>Add Header</button>
    </div>
  )
}

export default RequestHeadersPanel;