type Header = {
  key: string;
  value: string;
}

type RequestPanelProps = {
  method: string;
  headers: Header[];
  body: string;
  onHeadersChange: (headers: Header[]) => void;
  onNewHeaderAddition: (header: Header) => void;
  onBodyChange: (value: string) => void;
}