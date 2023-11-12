export type ResponsePanelProps = {
  isNoRequestTriggered: boolean
  isLoading: boolean
  response: string
  statusCode: number
  statusText: string
}

export type RawResponseViewerProps = {
  response: string
}

export type StatusProps = {
  statusCode: number
  statusText: string
}