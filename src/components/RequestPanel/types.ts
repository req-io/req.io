export type Header = {
  key: string;
  value: string;
}

export type RequestPanelProps = {
  method: string;
  headers: Header[];
  body: string;
  onHeadersChange: (headers: Header[]) => void;
  onBodyChange: (value: string) => void;
}