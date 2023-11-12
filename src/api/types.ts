export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | Array<JSONValue>;

export type HeadersMapping = {
  [key: string]: string;
}

export type HttpStatusCodes = {
  [key: number]: string;
};

export type AxiosErrorCodes = {
  [key: string]: string;
}