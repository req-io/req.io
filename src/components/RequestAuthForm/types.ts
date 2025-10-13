import { AuthType } from '../RequestAuthPanel/types';

export type RequestAuthFormProps = {
  authType: AuthType;
  onCredentialsChange: (credentials: object) => void;
};

export type AuthFormsProps = {
  onCredentialsChange: (credentials: object) => void;
};
