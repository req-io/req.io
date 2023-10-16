type methodSelectProps = {
  value: string,
  methods: string[],
  onSelect: (method: string) => void
}

type UrlPanelProps = {
  onResponse: (response: string) => void
}