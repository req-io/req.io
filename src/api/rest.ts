import { Header } from '../components/RequestPanel/types.ts';
import { HeadersMapping, JSONValue } from './types.ts';

const restructureHeaders = (headers: Header[]) => {
  const formattedHeaders: HeadersMapping = {};
  headers.forEach((header: Header) => {
    formattedHeaders[header.key] = header.value;
  });
  return formattedHeaders;
};

declare global {
  interface Window {
    api: {
      fetch<T = unknown>(
        url: string,
        options?: RequestInit
      ): Promise<{
        ok: boolean;
        data?: T;
        error?: string;
        status?: number;
        statusText?: string;
        headers?: Record<string, string>;
      }>;
    };
  }
}

export const get = async (url: string, headers: Header[] = []) => {
  const options: RequestInit = {
    headers: restructureHeaders(headers),
    method: 'GET',
  };
  return window.api.fetch(url, options);
};

export const post = async (url: string, body: JSONValue, headers: Header[] = []) => {
  const options: RequestInit = {
    headers: restructureHeaders(headers),
    method: 'POST',
    body: JSON.stringify(body),
  };
  return window.api.fetch(url, options);
};

export const patch = async (url: string, body: JSONValue, headers: Header[] = []) => {
  const options: RequestInit = {
    headers: restructureHeaders(headers),
    method: 'PATCH',
    body: JSON.stringify(body),
  };
  return window.api.fetch(url, options);
};

export const put = async (url: string, body: JSONValue, headers: Header[] = []) => {
  const options: RequestInit = {
    headers: restructureHeaders(headers),
    method: 'PUT',
    body: JSON.stringify(body),
  };
  return window.api.fetch(url, options);
};

export const delete_req = async (url: string, headers: Header[] = []) => {
  const options: RequestInit = {
    headers: restructureHeaders(headers),
    method: 'DELETE',
  };
  return window.api.fetch(url, options);
};
