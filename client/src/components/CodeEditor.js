import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ code, onChange, language }) => {
  const [editorTheme] = useState('vs-dark');

  const getLanguageMode = (lang) => {
    const modes = {
      html: 'html',
      javascript: 'javascript',
      python: 'python',
      java: 'java'
    };
    return modes[lang] || 'javascript';
  };

  const editorOptions = {
    minimap: { enabled: true },
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on'
  };

  return (
    <div className="code-editor-container glass-card">
      <div className="editor-header">
        <span className="editor-title">Code Editor - {language.toUpperCase()}</span>
      </div>
      <div className="editor-wrapper">
        <Editor
          height="100%"
          language={getLanguageMode(language)}
          value={code}
          onChange={onChange}
          theme={editorTheme}
          options={editorOptions}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
