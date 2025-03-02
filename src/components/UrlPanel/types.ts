export type MethodSelectProps = {
  value: string;
  methods: string[];
  onSelect: (method: string) => void;
};

export type UrlPanelProps = {
  url: string;
  method: string;
  onMethodChange: (method: string) => void;
  onUrlChange: (url: string) => void;
  onSend: () => void;
};
