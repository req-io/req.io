import './index.scss'
import Editor from "../Editor";
import Spinner from "../Spinner";
import { useState } from "react";
import Navbar from "../Navbar";


const EmptyPlaceholder = () => <div className='empty-placeholder'>No response yet!</div>;

const RawResponseViewer = (props: RawResponseViewerProps) => {
  return <div className='raw-response'>{ props.response }</div>
}

const getStatusClassName = (statusCode: number) => {
  if (statusCode >= 200 && statusCode < 300) {
    return 'success';
  }
  if (statusCode >= 300 && statusCode < 400) {
    return 'redirect';
  }
  if (statusCode >= 400 && statusCode < 500) {
    return 'client-error';
  }
  if (statusCode >= 500 && statusCode < 600) {
    return 'server-error';
  }
}

const ResponsePanel = (props: ResponsePanelProps) => {
  const [ activeItem, setActiveItem ] = useState('preview');

  const items = [
    { name: 'preview', label: 'Preview' },
    { name: 'raw', label: 'Raw' },
  ];

  const itemsConfig = items.map((item) => ({
      ...item,
      isActive: item.name === activeItem,
      onClick: () => setActiveItem(item.name),
    })
  );

  const navbarItemComponentMap: any = {
    preview: <Editor readOnly={ true } initialValue={ props.response }/>,
    raw: <RawResponseViewer response={ props.response }/>
  };

  const statusClassName = `status ${ getStatusClassName(props.statusCode) }`

  return (
    <div className='response-panel'>
      <div className='response-panel-header'>
        <Navbar items={ itemsConfig }/>
        { !(props.isNoRequestTriggered || props.isLoading) &&
            <div className={ statusClassName }>{ props.statusCode } { props.statusText }</div> }
      </div>
      {
        props.isLoading
          ? <Spinner/>
          : (props.isNoRequestTriggered ? <EmptyPlaceholder/> : navbarItemComponentMap[activeItem])
      }
    </div>
  )
}

export default ResponsePanel