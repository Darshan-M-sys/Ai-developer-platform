import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, theme, fontSize, code, setCode }) => {
  
  return (
    <div className="h-[80vh] w-full  p-2 md:px-9  rounded-xl">
      <Editor
        height="100%"
        language={language}
        theme={theme}
        value={code}
        onChange={(value) => setCode(value)}
        options={{
          fontSize: fontSize,
          minimap: { enabled: false },
          automaticLayout: true,
          wordWrap: "on",
        }}
      />
    </div>
  );
};

export default CodeEditor;