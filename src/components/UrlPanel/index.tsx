import './index.scss';
import React from "react";
import { get } from "../../api/rest.ts";
import { AxiosResponse } from "axios";

const MethodSelect = ({ methods, onSelect }: methodSelectProps) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  }
  const items = methods.map((method: string) => <option>{ method }</option>);
  return <select className='method-select' onChange={ onChange }>{ items }</select>;
}

const UrlPanel = ({ method, onResponse, onMethodChange }: UrlPanelProps) => {
  const [ url, setUrl ] = React.useState('');

  const onMethodSelect = (method: string) => onMethodChange(method);

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => setUrl(event.target.value);

  const onSend = () => {
    if (method === 'GET' && url !== '') {
      get(url)
        .then((response: AxiosResponse) => onResponse(JSON.stringify(response.data, null, 2)))
        .catch((error: Error) => console.log('error', error));
    }
  }

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
        value={ url } onChange={ onUrlChange }
      />
      <button className='send-button' onClick={ onSend }>Send</button>
    </div>
  );
};

export default UrlPanel;