import './index.scss';
import React from "react";

const MethodSelect = ({ methods, onSelect }: MethodSelectProps) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  }
  const items = methods.map((method: string) => <option>{ method }</option>);
  return <select className='method-select' onChange={ onChange }>{ items }</select>;
}

const UrlPanel = ({ method, url, onMethodChange, onSend, onUrlChange }: UrlPanelProps) => {
  const onMethodSelect = (method: string) => onMethodChange(method);

  const onSendButtonClick = () => onSend();

  const onUrlUpdate = (event: React.ChangeEvent<HTMLInputElement>) => onUrlChange(event.target.value);

  return (
    <div className='url-panel'>
      <MethodSelect
        value={ method }
        methods={ [ 'GET', 'POST', 'PATCH', 'PUT', 'DELETE' ] }
        onSelect={ onMethodSelect }
      />
      <input
        type='text' className='url-input'
        placeholder='https://example.com'
        value={ url } onChange={ onUrlUpdate }
      />
      <button className='send-button' onClick={ onSendButtonClick }>Send</button>
    </div>
  );
};

export default UrlPanel;