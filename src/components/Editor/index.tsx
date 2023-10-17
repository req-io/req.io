import { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools"

import './index.scss';

const JsonViewer = (props: JsonViewerProps) => {
  return (
    <AceEditor
      className='editor'
      onLoad={ () => console.log('Read only Editor loaded!') }
      value={ props.initialValue }
      readOnly={ true }
      { ...props.options }
    />
  );
};

const JsonEditor = (props: JsonEditorProps) => {
  const [ json, setJson ] = useState(props.initialValue);

  const handleChange = (value: string) => {
    setJson(value);
    props.onValueChange && props.onValueChange(value);
  }

  return (
    <AceEditor
      className='editor'
      onLoad={ () => console.log('Editor loaded!') }
      onChange={ handleChange }
      value={ json }
      { ...props.options }
    />
  );
}

const Editor = (props: EditorProps) => {
  const options: EditorOptions = {
    mode: "json",
    theme: "terminal",
    placeholder: "",
    name: "editor",
    fontSize: 14,
    showPrintMargin: false,
    showGutter: true,
    highlightActiveLine: true,
    setOptions: {
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      showLineNumbers: true,
      tabSize: 2
    }
  };

  return props.readOnly
    ? <JsonViewer options={ options } initialValue={ props.initialValue }/>
    : <JsonEditor options={ options } initialValue={ props.initialValue } onValueChange={props.onValueChange}/>
};

export default Editor;