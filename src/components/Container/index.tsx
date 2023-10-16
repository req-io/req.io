import './index.scss';
import RequestPanel from "../RequestPanel";
import ResponsePanel from "../ResponsePanel";
import PaneSplitter from "../PaneSplitter";
import UrlPanel from "../UrlPanel";
import React, { useEffect } from "react";


const Container = () => {
  const [ method, setMethod ] = React.useState('GET');
  const [ response, setResponse ] = React.useState('');

  useEffect(() => {
    console.log('response updated!', response)
  }, [ response ]);

  return (
    <div className='container'>
      <UrlPanel method={ method } onResponse={ setResponse } onMethodChange={ setMethod }/>
      <div className='sub-container'>
        <RequestPanel method={ method }/>
        <PaneSplitter direction='horizontal'/>
        <ResponsePanel response={ response }/>
      </div>
    </div>
  );
};

export default Container;