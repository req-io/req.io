import { AuthType } from '../RequestAuthPanel/types';

export type RequestAuthFormProps = {
  authType: AuthType;
  onCredentialsChange: (credentials: object) => void;
};

export type AuthForms = {
  onCredentialsChange: (credentials: object) => void;
};
