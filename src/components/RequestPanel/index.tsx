import './index.scss';
import Editor from '../Editor';
import Navbar from '../Navbar';
import { useState } from 'react';
import RequestHeadersPanel from '../RequestHeadersPanel';
import { RequestPanelProps } from './types.ts';
import { NavbarItemComponentMap } from '../Navbar/types.ts';
import RequestParamsPanel from '../RequestParamsPanel/index.tsx';

const EmptyRequestBodyPlaceholder = () => (
  <div className="empty-placeholder">No body required for GET requests!</div>
);

const RequestPanel = (props: RequestPanelProps) => {
  const [activeItem, setActiveItem] = useState('body');

  const items = [
    { name: 'body', label: 'Body' },
    { name: 'headers', label: 'Headers' },
    { name: 'params', label: 'Params' },
  ];

  const itemsConfig = items.map((item) => ({
    ...item,
    isActive: item.name === activeItem,
    onClick: () => setActiveItem(item.name),
  }));

  const requestBody =
    props.method === 'GET' ? (
      <EmptyRequestBodyPlaceholder />
    ) : (
      <Editor readOnly={false} initialValue={props.body} onValueChange={props.onBodyChange} />
    );

  const headerPanel = (
    <RequestHeadersPanel
      headers={props.headers}
      onHeadersChange={props.onHeadersChange}
      onNewHeaderAddition={props.onNewHeaderAddition}
    />
  );

  const paramsPanel = (
    <RequestParamsPanel
      params={props.params}
      onParamsChange={props.onParamsChange}
      onNewParamAddition={props.onNewParamAddition}
    />
  );

  const navbarItemComponentMap: NavbarItemComponentMap = {
    body: requestBody,
    headers: headerPanel,
    params: paramsPanel,
  };

  return (
    <div className="request-panel">
      <Navbar items={itemsConfig} />
      {navbarItemComponentMap[activeItem]}
    </div>
  );
};

export default RequestPanel;
