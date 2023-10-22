type RequestHeaderPanelProps = {
  headers: Header[];
  onHeadersChange: (headers: Header[]) => void;
  onNewHeaderAddition: (header: Header) => void;
}