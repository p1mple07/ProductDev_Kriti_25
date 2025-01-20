import React, { useState } from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

const CodeDisplay = ({ chat, isExpanded }) => {
  const [selectedTab, setSelectedTab] = useState("preview");
  const [selectedCodeType, setSelectedCodeType] = useState("html");

  if (!chat) return null;

  const { promptsAndResponses } = chat;
  const lastResponse = promptsAndResponses?.[promptsAndResponses.length - 1]?.response;

  return (
    <div
      className={`transition-all duration-500 bg-gradient-to-b from-secondary to-background flex min-h-0 ${
        isExpanded ? "w-full" : "w-3/5"
      }`}
    >
      {isExpanded ? (
        // Expanded mode
        <div className="w-full flex min-h-0">
          <div className="w-1/2 flex flex-col min-h-0 border-r border-gray-700">
            <div className="flex space-x-2 bg-tertiary p-2 rounded-lg m-4 flex-shrink-0">
              {["html", "css", "script"].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 text-sm rounded-lg focus:outline-none transition-colors ${
                    selectedCodeType === type 
                      ? "bg-accent text-primary_text"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setSelectedCodeType(type)}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex-1 bg-tertiary m-4 mt-0 rounded-lg text-gray-200 custom-scrollbar overflow-y-auto">
              <pre className="p-4 whitespace-pre-wrap">
                <code>{lastResponse?.[selectedCodeType]}</code>
              </pre>
            </div>
          </div>
          <div className="w-1/2 flex flex-col min-h-0 p-4">
            <iframe
              title="Preview"
              className="flex-1 w-full bg-white rounded-lg shadow-lg"
              srcDoc={`<html><head><style>${lastResponse?.css}</style></head><body>${lastResponse?.html}<script>${lastResponse?.script}</script></body></html>`}
            />
          </div>
        </div>
      ) : (
        // Collapsed mode
        <div className="w-full flex flex-col min-h-0">
          <div className="flex space-x-2 bg-tertiary p-2 rounded-lg m-4 flex-shrink-0">
            <button
              className={`flex items-center px-4 py-2 text-sm rounded-lg focus:outline-none transition-colors ${
                selectedTab === "code"
                  ? "bg-accent text-primary_text"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setSelectedTab("code")}
            >
              <CodeBracketIcon className="w-5 h-5 mr-2" />
              Code
            </button>
            <button
              className={`flex items-center px-4 py-2 text-sm rounded-lg focus:outline-none transition-colors ${
                selectedTab === "preview"
                  ? "bg-accent text-primary_text"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setSelectedTab("preview")}
            >
              <EyeIcon className="w-5 h-5 mr-2" />
              Preview
            </button>
          </div>

          <div className="flex-1 min-h-0 m-4 mt-0">
            {selectedTab === "code" ? (
              <div className="flex flex-col h-full">
                <select
                  className="w-full bg-tertiary text-gray-200 p-2 rounded-lg mb-2 flex-shrink-0 border border-gray-700 focus:ring-2 focus:ring-accent"
                  value={selectedCodeType}
                  onChange={(e) => setSelectedCodeType(e.target.value)}
                >
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="script">Script</option>
                </select>
                <div className="flex-1 bg-tertiary rounded-lg text-gray-200 custom-scrollbar overflow-y-auto">
                  <pre className="p-4 whitespace-pre-wrap">
                    <code>{lastResponse?.[selectedCodeType]}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe
                  title="Preview"
                  className="w-full h-full"
                  srcDoc={`<html><head><style>${lastResponse?.css}</style></head><body>${lastResponse?.html}<script>${lastResponse?.script}</script></body></html>`}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;