import './index.scss'
import React from "react";

const RequestHeadersPanel = (props: RequestHeaderPanelProps) => {
  const onHeadersChange = (id: number, updatedHeader: Header) => {
    const updatedHeaders = [ ...props.headers ]
    updatedHeaders[id] = updatedHeader
    props.onHeadersChange(updatedHeaders)
  }

  const onNewHeaderAddition = () => {
    props.onNewHeaderAddition({ key: '', value: '' })
  }

  const headerRows = props.headers.map((header: Header, index) => {
    const onHeaderKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onHeadersChange(index, { ...header, key: e.target.value })
    }

    const onHeaderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onHeadersChange(index, { ...header, value: e.target.value })
    }

    return (
      <tr>
        <td><input type='text' value={ header.key } onChange={ onHeaderKeyChange }/></td>
        <td><input type='text' value={ header.value } onChange={ onHeaderValueChange }/></td>
      </tr>
    )
  })
  return (
    <div className='request-headers-panel'>
      <table className='headers-table'>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        { ...headerRows }
      </table>
      <button className='button' onClick={ onNewHeaderAddition }>Add Header</button>
    </div>
  )
}

export default RequestHeadersPanel;