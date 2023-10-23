import './index.scss';
import RequestPanel from "../RequestPanel";
import ResponsePanel from "../ResponsePanel";
import PaneSplitter from "../PaneSplitter";
import UrlPanel from "../UrlPanel";
import { get, post } from "../../api/rest.ts";
import { getStatusText } from "../../api/statusCodes.ts";

import { useState } from "react";
import { AxiosResponse } from "axios";


const AppBody = () => {
  const [ method, setMethod ] = useState('GET');
  const [ url, setUrl ] = useState('');
  const [ headers, setHeaders ] = useState([ { key: 'Content-Type', value: 'application/json' } ]);
  const [ body, setBody ] = useState('');
  const [ isNoRequestTriggered, setIsNoRequestTriggered ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ response, setResponse ] = useState('');
  const [ statusCode, setStatusCode ] = useState(0);
  const [ statusText, setStatusText ] = useState('');

  const onSend = () => {
    if (method === 'GET' && url !== '') {
      setIsLoading(true);
      get(url, headers)
        .then((response: AxiosResponse) => {
          setIsNoRequestTriggered(false);
          setIsLoading(false);
          setResponse(JSON.stringify(response.data, null, 2));
          setStatusCode(response.status);
          setStatusText(response.statusText || getStatusText(response.status));
        })
        .catch((error: Error) => console.log('error', error));
    }
    if (method === 'POST' && url !== '') {
      setIsLoading(true);
      post(url, JSON.parse(body), headers)
        .then((response: AxiosResponse) => {
          setIsNoRequestTriggered(false);
          setIsLoading(false);
          setResponse(JSON.stringify(response.data, null, 2));
          setStatusCode(response.status);
          setStatusText(response.statusText || getStatusText(response.status));
        })
        .catch((error: Error) => console.log('error', error));
    }
  }

  const onNewHeaderAddition = (header: Header) => {
    setHeaders([ ...headers, header ])
  }

  const onHeadersChange = (updatedHeaders: Header[]) => {
    setHeaders(updatedHeaders)
  }

  return (
    <div className='app-body'>
      <UrlPanel method={ method } url={ url } onMethodChange={ setMethod } onUrlChange={ setUrl } onSend={ onSend }/>
      <div className='sub-container'>
        <RequestPanel method={ method } headers={ headers } onHeadersChange={ onHeadersChange }
                      onNewHeaderAddition={ onNewHeaderAddition } onBodyChange={ setBody }/>
        <PaneSplitter direction='horizontal'/>
        <ResponsePanel isNoRequestTriggered={ isNoRequestTriggered } isLoading={ isLoading } response={ response }
                       statusCode={ statusCode } statusText={ statusText }/>
      </div>
    </div>
  );
};

export default AppBody;