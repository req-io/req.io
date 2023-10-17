type EditorProps = {
  readOnly: boolean,
  initialValue: string
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
}

type JsonViewerProps = {
  options: EditorOptions,
  initialValue: string
}