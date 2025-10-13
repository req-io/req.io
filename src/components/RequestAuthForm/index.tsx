import './index.scss';
import { RequestAuthFormProps, AuthForms } from './types';

import { AuthType } from '../RequestAuthPanel/types';
import { useState } from 'react';

const BasicAuthForm = (props: AuthForms) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    props.onCredentialsChange({ username: event.target.value, password });
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    props.onCredentialsChange({ username, password: event.target.value });
  };

  return (
    <div className="authentication-form">
      <input
        value={username}
        className="input"
        placeholder="Username"
        onChange={onUsernameChange}
      />
      <input
        value={password}
        className="input"
        placeholder="Password"
        onChange={onPasswordChange}
      />
    </div>
  );
};

const ApiKeyAuthForm = (props: AuthForms) => {
  const [authKey, setAuthKey] = useState('');
  const [authValue, setAuthValue] = useState('');

  const onAuthKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthKey(event.target.value);
    props.onCredentialsChange({key: event.target.value, value: authValue});
  }

  const onAuthValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthValue(event.target.value);
    props.onCredentialsChange({key: authKey, value: event.target.value});
  }
  return <div className="authentication-form horizontal">
    <input
      value={authKey}
      className="input"
      placeholder="Key"
      onChange={onAuthKeyChange}
    />
    <span className="keyValueSeparator">:</span>
    <input
      value={authValue}
      className="input"
      placeholder="Value"
      onChange={onAuthValueChange}
    />
  </div>;
}

const RequestAuthForm = (props: RequestAuthFormProps) => {
  if (props.authType == AuthType.NoAuth) {
    return <div className="auth-placeholder">Select authentication type!</div>;
  }
  if (props.authType == AuthType.BasicAuth) {
    return <BasicAuthForm onCredentialsChange={props.onCredentialsChange} />;
  }
  return <ApiKeyAuthForm onCredentialsChange={props.onCredentialsChange}/>
};

export default RequestAuthForm;
