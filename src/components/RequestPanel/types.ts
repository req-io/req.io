export type Header = {
  key: string;
  value: string;
}

export type Param = {
  key: string;
  value: string;
}

export type RequestPanelProps = {
  method: string;
  headers: Header[];
  params: Param[];
  body: string;
  onHeadersChange: (headers: Header[]) => void;
  onNewHeaderAddition: (header: Header) => void;
  onParamsChange: (params: Param[]) => void;
  onNewParamAddition: (param: Param) => void;
  onBodyChange: (value: string) => void;
}