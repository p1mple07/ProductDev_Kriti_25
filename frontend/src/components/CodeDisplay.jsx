import React, { useState } from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { HiFolderDownload } from "react-icons/hi";

const CodeDisplay = ({ chat, isExpanded }) => {
  const [selectedTab, setSelectedTab] = useState("preview");
  const [selectedCodeType, setSelectedCodeType] = useState("html");
  const { codeBody} = useSelector((state) => state.code);

  if (!chat) return null;
  let lastResponse = codeBody;

  const downloadCodeAsZip = () => {
    if (!lastResponse) return;

    const zip = new JSZip();
    zip.file("index.html", lastResponse.html || "");
    zip.file("style.css", lastResponse.css || "");
    zip.file("script.js", lastResponse.script || "");

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "code.zip");
    });
  };

  // const { promptsAndResponses } = chat;
  // const lastResponse = promptsAndResponses?.[promptsAndResponses.length - 1]?.response;

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
              srcDoc={`<html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" /><style>${lastResponse?.css}</style></head><body>${lastResponse?.html}<script>${lastResponse?.script}</script></body></html>`}
            />
          </div>
        </div>
      ) : (
        // Collapsed mode
        <div className="w-full flex flex-col min-h-0">
          <div className="relative flex space-x-2 bg-tertiary p-2 rounded-lg m-4 flex-shrink-0">
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

            <button
              className="absolute right-2 flex items-center px-4 py-2 text-sm rounded-lg bg-gray-700 text-gray-300 hover:bg-accent text-primary_text transition-colors"
              onClick={downloadCodeAsZip}
            >
              <HiFolderDownload className="w-5 h-5 inline-block mr-2" />
              Download ZIP
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
                  srcDoc={`<html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" /><style>${lastResponse?.css}</style></head><body>${lastResponse?.html}<script>${lastResponse?.script}</script></body></html>`}
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