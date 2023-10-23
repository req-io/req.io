type ResponsePanelProps = {
  isNoRequestTriggered: boolean
  isLoading: boolean
  response: string
  statusCode: number
  statusText: string
}

type RawResponseViewerProps = {
  response: string
}