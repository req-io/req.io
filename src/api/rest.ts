import axios from "axios";
import { Header } from "../components/RequestPanel/types.ts";
import { HeadersMapping, JSONValue } from "./types.ts";

const restructureHeaders = (headers: Header[]) => {
  const formattedHeaders: HeadersMapping = {};
  headers.forEach((header: Header) => {
    formattedHeaders[header.key] = header.value;
  });
  return formattedHeaders;
};

export const get = async (url: string, headers: Header[] = []) => {
  return axios.get(url, {
    headers: restructureHeaders(headers),
  });
}

export const post = async (url: string, body: JSONValue, headers: Header[] = []) => {
  return axios.post(url, body, {
    headers: restructureHeaders(headers),
  });
}

export const patch = async (url: string, body: JSONValue, headers: Header[] = []) => {
  return axios.patch(url, body, {
    headers: restructureHeaders(headers),
  });
}

export const put = async (url: string, body: JSONValue, headers: Header[] = []) => {
  return axios.put(url, body, {
    headers: restructureHeaders(headers),
  });
}
export const delete_req = async (url: string, headers: Header[] = []) => {
  return axios.delete(url, {
    headers: restructureHeaders(headers),
  });
}