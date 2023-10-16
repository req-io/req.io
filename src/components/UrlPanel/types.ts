type methodSelectProps = {
  value: string,
  methods: string[],
  onSelect: (method: string) => void
}

type UrlPanelProps = {
  method: string,
  onResponse: (response: string) => void,
  onMethodChange: (response: string) => void
}