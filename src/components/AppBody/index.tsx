import './index.scss';
import RequestPanel from "../RequestPanel";
import ResponsePanel from "../ResponsePanel";
import PaneSplitter from "../PaneSplitter";
import UrlPanel from "../UrlPanel";
import { get, post } from "../../api/rest.ts";
import { getErrorCode, getHttpStatusText } from "../../api/statusCodes.ts";

import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";


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

  const onSuccessResponse = (response: AxiosResponse) => {
    setIsLoading(false);
    setResponse(JSON.stringify(response.data, null, 2));
    setStatusCode(response.status);
    setStatusText(response.statusText || getHttpStatusText(response.status));
  }

  const onFailureResponse = (error: AxiosError) => {
    setIsLoading(false);
    if (error.response) {
      setResponse(JSON.stringify(error.response?.data || {}, null, 2));
      setStatusCode(error.response?.status || 0);
      setStatusText(error.response?.statusText || getHttpStatusText(statusCode));
    } else {
      setResponse(`Error: ${ error.message }`);
      setStatusText(`ERROR: ${ getErrorCode(error?.code || '') }`);
      setStatusCode(0);
    }
  }

  const onSend = () => {
    if (method === 'GET' && url !== '') {
      setIsNoRequestTriggered(false);
      setIsLoading(true);
      get(url, headers)
        .then(onSuccessResponse)
        .catch(onFailureResponse);
    }
    if (method === 'POST' && url !== '') {
      setIsNoRequestTriggered(false);
      setIsLoading(true);
      post(url, JSON.parse(body), headers)
        .then(onSuccessResponse)
        .catch(onFailureResponse);
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
      <UrlPanel
        method={ method } url={ url }
        onMethodChange={ setMethod }
        onUrlChange={ setUrl }
        onSend={ onSend }
      />
      <div className='sub-container'>
        <RequestPanel
          method={ method } headers={ headers }
          onHeadersChange={ onHeadersChange }
          onNewHeaderAddition={ onNewHeaderAddition }
          onBodyChange={ setBody }
        />
        <PaneSplitter direction='horizontal'/>
        <ResponsePanel
          isNoRequestTriggered={ isNoRequestTriggered }
          isLoading={ isLoading } response={ response }
          statusCode={ statusCode } statusText={ statusText }
        />
      </div>
    </div>
  );
};

export default AppBody;