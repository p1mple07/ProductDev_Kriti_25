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
      className={`transition-all duration-500 bg-gradient-to-b from-[#0A0F14] to-black flex ${
        isExpanded ? "w-full" : "w-3/5"
      }`}
    >
      {isExpanded ? (
        // Expanded mode: Side-by-side Code & Preview with independent scrolling
        <div className="w-full flex">
          <div className="w-1/2 p-4 border-r border-border flex flex-col">
            <div className="flex space-x-2 bg-tertiary p-2 rounded-lg">
              {["html", "css", "script"].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 text-sm rounded-md focus:outline-none ${
                    selectedCodeType === type ? "bg-accent text-white" : "bg-primary text-secondary_text"
                  }`}
                  onClick={() => setSelectedCodeType(type)}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="mt-4 bg-primary p-4 rounded-lg text-secondary_text overflow-auto flex-1">
              <pre className="whitespace-pre-wrap">
                <code>{lastResponse?.[selectedCodeType]}</code>
              </pre>
            </div>
          </div>
          <div className="w-1/2 p-4 flex flex-col">
            <iframe
              title="Preview"
              className="w-full flex-1 bg-white rounded-lg shadow-lg overflow-auto"
              srcDoc={`<html><head><style>${lastResponse?.css}</style></head><body>${lastResponse?.html}<script>${lastResponse?.script}</script></body></html>`}
            />
          </div>
        </div>
      ) : (
        // Collapsed mode: Tabs for Code & Preview, with a dropdown for HTML/CSS/JS
        <div className="w-full p-4 flex flex-col">
          <div className="flex space-x-2 bg-tertiary p-2 rounded-lg">
            <button
              className={`flex items-center px-4 py-2 text-sm rounded-md focus:outline-none ${
                selectedTab === "code" ? "bg-accent text-white" : "bg-primary text-secondary_text"
              }`}
              onClick={() => setSelectedTab("code")}
            >
              <CodeBracketIcon className="w-5 h-5 mr-1" />
              Code
            </button>
            <button
              className={`flex items-center px-4 py-2 text-sm rounded-md focus:outline-none ${
                selectedTab === "preview" ? "bg-accent text-white" : "bg-primary text-secondary_text"
              }`}
              onClick={() => setSelectedTab("preview")}
            >
              <EyeIcon className="w-5 h-5 mr-1" />
              Preview
            </button>
          </div>

          {selectedTab === "code" ? (
            <div className="mt-4 bg-primary p-4 rounded-lg text-secondary_text overflow-auto flex-1">
              <select
                className="w-full bg-tertiary text-white p-2 rounded-md mb-2"
                value={selectedCodeType}
                onChange={(e) => setSelectedCodeType(e.target.value)}
              >
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="script">Script</option>
              </select>
              <pre className="whitespace-pre-wrap">
                <code>{lastResponse?.[selectedCodeType]}</code>
              </pre>
            </div>
          ) : (
            <iframe
              title="Preview"
              className="w-full flex-1 bg-white rounded-lg shadow-lg overflow-auto"
              srcDoc={`<html><head><style>${lastResponse?.css}</style></head><body>${lastResponse?.html}<script>${lastResponse?.script}</script></body></html>`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;
