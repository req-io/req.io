export type EditorProps = {
  readOnly: boolean,
  initialValue: string,
  onValueChange?: (value: string) => void
}

export type EditorOptions = {
  mode: string;
  name: string;
  highlightActiveLine: boolean;
  setOptions: {
    tabSize: number;
    showLineNumbers: boolean;
    enableBasicAutocompletion: boolean;
    enableSnippets: boolean;
    enableLiveAutocompletion: boolean
  };
  wrapEnabled: boolean;
  theme: string;
  fontSize: number;
  showGutter: boolean;
  placeholder: string;
  showPrintMargin: boolean
}

export type JsonEditorProps = {
  options: EditorOptions,
  initialValue: string
  onValueChange?: (content: string) => void
}

export type JsonViewerProps = {
  options: EditorOptions,
  initialValue: string
}
