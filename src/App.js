import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './App.css';

function App() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    function createMarkup(html) {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                Rich Text Editor Example
            </header>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
            <div
                className="preview"
                dangerouslySetInnerHTML={createMarkup(convertedContent)}>
            </div>
        </div>
    )
}

export default App;
