import axios from "axios";

type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | Array<JSONValue>;

const restructureHeaders = (headers: any[]) => {
  const formattedHeaders: any = {};
  headers.forEach((header: any) => {
    formattedHeaders[header.key] = header.value;
  });
  return formattedHeaders;
};

export const get = async (url: string, headers: any[] = []) => {
  return axios.get(url, {
    headers: restructureHeaders(headers),
  });
}

export const post = async (url: string, body: JSONValue, headers: any[] = []) => {
  return axios.post(url, body, {
    headers: restructureHeaders(headers),
  });
}

