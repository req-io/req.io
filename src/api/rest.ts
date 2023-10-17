import axios from "axios";

type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | Array<JSONValue>;

export const get = async (url: string) => {
  return axios.get(url);
}

export const post = async (url: string, body: JSONValue) => {
  return axios.post(url, body);
}

