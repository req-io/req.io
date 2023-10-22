type Header = {
  key: string;
  value: string;
}

type RequestPanelProps = {
  method: string;
  headers: Header[];
  onHeadersChange: (headers: Header[]) => void;
  onNewHeaderAddition: (header: Header) => void;
  onBodyChange: (value: string) => void;
}