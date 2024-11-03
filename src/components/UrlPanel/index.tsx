import './index.scss';
import { UrlPanelProps } from './types.ts';
import Dropdown from '../Dropdown/index.tsx';

const UrlPanel = ({ url, onMethodChange, onSend, onUrlChange }: UrlPanelProps) => {
  const onUrlKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSend();
    }
  };

  const onSendButtonClick = () => onSend();

  const onUrlUpdate = (event: React.ChangeEvent<HTMLInputElement>) =>
    onUrlChange(event.target.value);

  const items = [
    { name: 'GET', onSelect: () => onMethodChange('GET'), color: '#10B95F' },
    { name: 'POST', onSelect: () => onMethodChange('POST'), color: '#FFC107' },
    { name: 'PATCH', onSelect: () => onMethodChange('PATCH'), color: '#6366F1' },
    { name: 'PUT', onSelect: () => onMethodChange('PUT'), color: '#007BFF' },
    { name: 'DELETE', onSelect: () => onMethodChange('DELETE'), color: '#DC3545' },
  ];

  return (
    <div className="url-panel">
      <Dropdown items={items} />
      <input
        type="text"
        className="url-input"
        placeholder="https://example.com"
        value={url}
        onChange={onUrlUpdate}
        onKeyDown={onUrlKeyDown}
      />
      <button className="send-button" onClick={onSendButtonClick}>
        Send
      </button>
    </div>
  );
};

export default UrlPanel;
