import './index.scss';
import { ResponseHeaderPanelProps } from './types.ts';
import { Header } from '../ResponsePanel/types.ts';

const ResponseHeadersPanel = (props: ResponseHeaderPanelProps) => {
  const headerRows = props.headers.map((header: Header, index) => {
    return (
      <tr key={index}>
        <td className="header-key" test-id="header-key">
          <p>{header.key}</p>
        </td>
        <td className="header-value" test-id="header-value">
          <p>{header.value}</p>
        </td>
      </tr>
    );
  });
  return (
    <div className="response-headers-panel">
      {props.headers.length > 0 ? (
        <table className="headers-table">
          <tbody>{headerRows}</tbody>
        </table>
      ) : (
        <p className="placeholder-msg">No headers to display.</p>
      )}
    </div>
  );
};

export default ResponseHeadersPanel;
