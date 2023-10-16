import { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools"

import './index.scss';

const Editor = (props: EditorProps) => {
  const [ json, setJson ] = useState(props.initialValue);

  const handleChange = (event: string) => {
    setJson(event);
  }

  const options = {
    mode: "json",
    theme: "terminal",
    placeholder: "",
    name: "editor",
    fontSize: 14,
    showPrintMargin: false,
    showGutter: true,
    highlightActiveLine: true,
    readOnly: props.readonly,
    setOptions: {
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      showLineNumbers: true,
      tabSize: 2
    }
  };

  return (
    <AceEditor
      className='editor'
      onLoad={ () => console.log('Editor loaded!') }
      onChange={ handleChange }
      value={ json }
      { ...options }
    />

  );
};

export default Editor;