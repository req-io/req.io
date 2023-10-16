import './index.scss';
import RequestPanel from "../RequestPanel";
import ResponsePanel from "../ResponsePanel";
import PaneSplitter from "../PaneSplitter";
import UrlPanel from "../UrlPanel";
import React, { useEffect } from "react";


const Container = () => {
  const [ response, setResponse ] = React.useState('');

  useEffect(() => {
    console.log('response updated!', response)
  }, [ response ]);

  return (
    <div className='container'>
      <UrlPanel onResponse={ setResponse }/>
      <div className='sub-container'>
        <RequestPanel/>
        <PaneSplitter direction='horizontal'/>
        <ResponsePanel response={ response }/>
      </div>
    </div>
  );
};

export default Container;