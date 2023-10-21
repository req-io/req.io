import './index.scss';
import RequestPanel from "../RequestPanel";
import ResponsePanel from "../ResponsePanel";
import PaneSplitter from "../PaneSplitter";
import UrlPanel from "../UrlPanel";
import { useState } from "react";
import { get, post } from "../../api/rest.ts";
import { AxiosResponse } from "axios";


const AppBody = () => {
  const [ method, setMethod ] = useState('GET');
  const [ url, setUrl ] = useState('');
  const [ headers, setHeaders ] = useState([{ key: 'Content-Type', value: 'application/json' }]);
  const [ body, setBody ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ response, setResponse ] = useState('');

  const onSend = () => {
    if (method === 'GET' && url !== '') {
      setIsLoading(true);
      get(url, headers)
        .then((response: AxiosResponse) => {
          setIsLoading(false);
          setResponse(JSON.stringify(response.data, null, 2));
        })
        .catch((error: Error) => console.log('error', error));
    }
    if (method === 'POST' && url !== '') {
      setIsLoading(true);
      post(url, JSON.parse(body), headers)
        .then((response: AxiosResponse) => {
          setIsLoading(false);
          setResponse(JSON.stringify(response.data, null, 2));
        })
        .catch((error: Error) => console.log('error', error));
    }
  }

  const onNewHeaderAddition = (header: Header) => {
    // @ts-ignore
    setHeaders([ ...headers, header ])
  }

  return (
    <div className='app-body'>
      <UrlPanel method={ method } url={ url } onMethodChange={ setMethod } onUrlChange={ setUrl } onSend={ onSend }/>
      <div className='sub-container'>
        <RequestPanel method={ method } headers={headers} onNewHeaderAddition={onNewHeaderAddition} onBodyChange={ setBody }/>
        <PaneSplitter direction='horizontal'/>
        <ResponsePanel isLoading={ isLoading } response={ response }/>
      </div>
    </div>
  );
};

export default AppBody;