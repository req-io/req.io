import './index.scss';
import Editor from '../Editor';
import Navbar from '../Navbar';
import { useState } from 'react';
import RequestHeadersPanel from '../RequestHeadersPanel';
import { RequestPanelProps } from './types.ts';
import { NavbarItemComponentMap } from '../Navbar/types.ts';
import RequestParamsPanel from '../RequestParamsPanel/index.tsx';
import Dropdown from '../Dropdown/index.tsx';

const EmptyRequestBodyPlaceholder = () => (
  <div className="empty-placeholder">No body required for GET requests!</div>
);

const RequestPanel = (props: RequestPanelProps) => {
  const [activeItem, setActiveItem] = useState('body');
  const [authType, setAuthType] = useState('no auth');

  const items = [
    { name: 'body', label: 'Body' },
    { name: 'headers', label: 'Headers' },
    { name: 'params', label: 'Params' },
    { name: 'authorization', label: 'Auth' },
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

  const onMethodSelect = (auth: string) => {
    setAuthType(auth.toLowerCase());
  };

  const authPanel = (
    <div className="auth-panel">
      <Dropdown
        methods={['No Auth', 'Basic Auth', 'API Key']}
        onSelect={onMethodSelect}
        height="40px"
        width="150px"
      />
      {authType === 'no auth' && (
        <div className="auth-placeholder">Select authentication type!</div>
      )}
      {authType === 'api key' && (
        <div className="api-key-value">
          <div className="apikey">
            <p>Key</p>
            <input
              type="text"
              className="url-input"
              placeholder="Enter the key name"
              // value={url}
              // onChange={onUrlUpdate}
              // onKeyDown={onUrlKeyDown}
            />
          </div>
          <div>
            <p>Value</p>
            <input
              type="text"
              className="url-input"
              placeholder="Enter the value of the key"
              // value={url}
              // onChange={onUrlUpdate}
              // onKeyDown={onUrlKeyDown}
            />
          </div>
        </div>
      )}
      {authType === 'basic auth' && <div></div>}
    </div>
  );

  const navbarItemComponentMap: NavbarItemComponentMap = {
    body: requestBody,
    headers: headerPanel,
    params: paramsPanel,
    authorization: authPanel,
  };

  return (
    <div className="request-panel">
      <Navbar items={itemsConfig} />
      {navbarItemComponentMap[activeItem]}
    </div>
  );
};

export default RequestPanel;
