export type Header = {
  key: string;
  value: string;
}

export type Query = {
  key: string;
  value: string;
}

export type RequestPanelProps = {
  method: string;
  headers: Header[];
  queries: Query[];
  body: string;
  onHeadersChange: (headers: Header[]) => void;
  onNewHeaderAddition: (header: Header) => void;
  onQueryChange: (queries: Query[]) => void;
  onNewQueryAddition: (query: Query) => void;
  onBodyChange: (value: string) => void;
}