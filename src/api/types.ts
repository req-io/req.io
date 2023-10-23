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

type StatusCodes = {
  [key: number]: string;
};