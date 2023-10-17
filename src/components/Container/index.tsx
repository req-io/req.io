import './index.scss';
import RequestPanel from "../RequestPanel";
import ResponsePanel from "../ResponsePanel";
import PaneSplitter from "../PaneSplitter";
import UrlPanel from "../UrlPanel";
import { useState } from "react";
import { get } from "../../api/rest.ts";
import { AxiosResponse } from "axios";


const Container = () => {
  const [ method, setMethod ] = useState('GET');
  const [ response, setResponse ] = useState('');
  const [ url, setUrl ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const onSend = () => {
    if (method === 'GET' && url !== '') {
      setIsLoading(true);
      get(url)
        .then((response: AxiosResponse) => {
          setIsLoading(false);
          setResponse(JSON.stringify(response.data, null, 2));
        })
        .catch((error: Error) => console.log('error', error));
    }
  }

  return (
    <div className='container'>
      <UrlPanel method={ method } url={ url } onMethodChange={ setMethod } onUrlChange={ setUrl } onSend={ onSend }/>
      <div className='sub-container'>
        <RequestPanel method={ method }/>
        <PaneSplitter direction='horizontal'/>
        <ResponsePanel isLoading={ isLoading } response={ response }/>
      </div>
    </div>
  );
};

export default Container;