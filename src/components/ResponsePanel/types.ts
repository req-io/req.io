export type Header = {
  key: string;
  value: string;
};

export type ResponsePanelProps = {
  isNoRequestTriggered: boolean;
  isLoading: boolean;
  response: string;
  headers: Header[];
  statusCode: number;
  statusText: string;
  timeTaken: number;
};

export type RawResponseViewerProps = {
  response: string;
};

export type StatusProps = {
  statusCode: number;
  statusText: string;
  statusTime: number;
};
