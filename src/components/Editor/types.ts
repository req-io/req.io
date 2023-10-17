type EditorProps = {
  readOnly: boolean,
  initialValue: string,
  onValueChange?: (value: string) => void
}

type EditorOptions = {
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
  theme: string;
  fontSize: number;
  showGutter: boolean;
  placeholder: string;
  showPrintMargin: boolean
}

type JsonEditorProps = {
  options: EditorOptions,
  initialValue: string
  onValueChange?: (content: string) => void
}

type JsonViewerProps = {
  options: EditorOptions,
  initialValue: string
}