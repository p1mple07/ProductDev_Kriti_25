import React from "react";

const CodeDisplay = ({ codeSnippet, isExpanded }) => {
  return (
    <div
      className={`transition-all duration-500 bg-secondary overflow-auto ${
        codeSnippet
          ? isExpanded
            ? "p-4 w-full opacity-100"
            : "p-4 w-3/5 opacity-100"
          : ""
      }`}
    >
      {codeSnippet && (
        <>
          <h2 className="text-xl font-bold mb-4">
            Code Snippet ({codeSnippet.language})
          </h2>
          <pre className="bg-primary p-4 rounded-md text-secondary_text overflow-x-auto">
            <code>{codeSnippet.content}</code>
          </pre>
        </>
      )}
    </div>
  );
};

export default CodeDisplay;
