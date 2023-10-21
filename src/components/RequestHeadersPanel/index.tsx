import './index.scss'

const RequestHeadersPanel = (props: RequestHeaderPanelProps) => {
  const headerRows = props.headers.map((header: Header) => (
    <tr>
      <td><input type='text' value={ header.key }/></td>
      <td><input type='text' value={ header.value }/></td>
    </tr>
  ))
  return (
    <div className='request-headers-panel'>
      <table className='headers-table'>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        { ...headerRows }
      </table>
    </div>
  )
}

export default RequestHeadersPanel;