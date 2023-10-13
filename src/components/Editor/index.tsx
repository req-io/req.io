import { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools"

import './index.scss';

const Editor = () => {
    const [json, setJson] = useState("{}");

    const handleChange = (event: string) => {
        setJson(event);
    }

    const options = {
        mode: "json",
        theme: "terminal",
        placeholder: "{}",
        name: "editor",
        fontSize: 14,
        showPrintMargin: false,
        showGutter: true,
        highlightActiveLine: true,
        setOptions:{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2
        }
    };

    return (
        <AceEditor className='editor'
            onLoad={(editor) => console.log(editor)}
            onChange={handleChange}
            value={json}
            {...options}
        />

    );
};

export default Editor;