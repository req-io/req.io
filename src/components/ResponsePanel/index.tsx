import './index.scss'
import Editor from "../Editor";
import Spinner from "../Spinner";
import { useState } from "react";
import Navbar from "../Navbar";


const EmptyPlaceholder = () => <div className='empty-placeholder'>No response yet!</div>;

const RawResponseViewer = (props: RawResponseViewerProps) => {
  return <div className='raw-response'>{ props.response }</div>
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


  return (
    <div className='response-panel'>
      <Navbar items={ itemsConfig }/>
      {
        props.isLoading
          ? <Spinner/>
          : (
            props.response === ''
              ? <EmptyPlaceholder/>
              : navbarItemComponentMap[activeItem]
          )
      }
    </div>
  )
}

export default ResponsePanel