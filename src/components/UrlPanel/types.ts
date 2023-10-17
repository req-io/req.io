

type MethodSelectProps = {
  value: string
  methods: string[]
  onSelect: (method: string) => void
}

type UrlPanelProps = {
  method: string
  url: string
  onMethodChange: (method: string) => void
  onUrlChange: (url: string) => void
  onSend: () => void
}