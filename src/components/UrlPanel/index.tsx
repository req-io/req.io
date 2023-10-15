import './index.scss';
import React from "react";
import { get } from "../../api/rest.ts";

const MethodSelect = ({ methods, onSelect }: methodSelectProps) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  }
  const items = methods.map((method: string) => <option>{ method }</option>);
  return (
    <select className='method-select' onChange={ onChange }>
      { items }
    </select>
  );
}

const UrlPanel = () => {
  const [ method, setMethod ] = React.useState('GET');
  const [ url, setUrl ] = React.useState('');

  const onMethodSelect = (method: string) => {
    setMethod(method);
  }

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }

  const onSend = () => {
    if (method === 'GET' && url !== '') {
      get(url)
        .then((response: object) => {
          console.log(response);
        });
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