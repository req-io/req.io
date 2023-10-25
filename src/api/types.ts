type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | Array<JSONValue>;

type HeadersMapping = {
  [key: string]: string;
}

type HttpStatusCodes = {
  [key: number]: string;
};

type AxiosErrorCodes = {
  [key: string]: string;
}