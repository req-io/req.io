export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | Array<JSONValue>;

export type HeadersMapping = {
  [key: string]: string;
};

export type HttpStatusCodes = {
  [key: number]: string;
};

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
}

// Deprecated - no longer using axios
export type AxiosErrorCodes = {
  [key: string]: string;
};
