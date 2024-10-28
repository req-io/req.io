import './index.scss';
import { MethodSelectProps, UrlPanelProps } from './types.ts';

const MethodSelect = ({ methods, onSelect, value }: MethodSelectProps) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  // Mapping method names to CSS variable names
  const methodColors: Record<string, string> = {
    GET: 'var(--color-get)',
    POST: 'var(--color-post)',
    PUT: 'var(--color-put)',
    PATCH: 'var(--color-patch)',
    DELETE: 'var(--color-delete)',
  };

  return (
    <select
      className="method-select"
      onChange={onChange}
      value={value}  // Controlled value
      style={{ color: methodColors[value], backgroundColor: 'transparent' }} // Set text color based on selected value
    >
      {methods.map((method: string) => (
        <option key={method} value={method} style={{ color: methodColors[method] }}>
          {method}
        </option>
      ))}
    </select>
  );
};

const UrlPanel = ({ method, url, onMethodChange, onSend, onUrlChange }: UrlPanelProps) => {
  const onUrlKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSend();
    }
  };

  const onMethodSelect = (method: string) => onMethodChange(method);

  const onSendButtonClick = () => onSend();

  const onUrlUpdate = (event: React.ChangeEvent<HTMLInputElement>) =>
    onUrlChange(event.target.value);

  return (
    <div className="url-panel">
      <MethodSelect
        value={method}
        methods={['GET', 'POST', 'PATCH', 'PUT', 'DELETE']}
        onSelect={onMethodSelect}
      />
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
