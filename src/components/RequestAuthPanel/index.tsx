import './index.scss';
import { AuthType, RequestAuthProps } from './types';

import Dropdown from '../Dropdown';
import RequestAuthForm from '../RequestAuthForm';

import { useState } from 'react';

const RequestAuthPanel = (props: RequestAuthProps) => {
  const [authType, setAuthType] = useState(AuthType.NoAuth);

  const items = [
    {
      id: 'NoAuth',
      name: 'NO AUTH',
      onSelect: () => setAuthType(AuthType.NoAuth),
      color: '#fafafa',
    },
    {
      id: 'BasicAuth',
      name: 'BASIC AUTH',
      onSelect: () => setAuthType(AuthType.BasicAuth),
      color: '#fafafa',
    },
    {
      id: 'ApiKey',
      name: 'API KEY',
      onSelect: () => setAuthType(AuthType.ApiKey),
      color: '#fafafa',
    },
  ];

  const onCredentialsChange = (credentials: object) => {
    props.onAuthChange({ ...credentials, authType });
  };

  return (
    <div className="request-auth-panel">
      <Dropdown items={items} />
      <RequestAuthForm authType={authType} onCredentialsChange={onCredentialsChange} />
    </div>
  );
};

export default RequestAuthPanel;
