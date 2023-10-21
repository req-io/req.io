type Header = {
  key: string;
  value: string;
}

type RequestPanelProps = {
  method: string;
  headers: Header[];
  onNewHeaderAddition: (header: Header) => void;
  onBodyChange: (value: string) => void;
}