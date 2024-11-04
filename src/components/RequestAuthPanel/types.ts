export enum AuthType {
  NoAuth = 'NO AUTH',
  ApiKey = 'API KEY',
  BasicAuth = 'BASIC AUTH'
}

export type RequestAuthProps = {
  onCredentialsChange: (credentials: object) => void;
}