import React, { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import useGemini from "../hooks/useGemini";
import useUpdateChat from "../hooks/useUpdateChat";
import { handleSend } from "../utils/handleSend";
import { setCode } from "../redux/codeDisplaySlice";
import { useSelector, useDispatch } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { HiCode } from "react-icons/hi";
import { HandleEnhance } from "../utils/handleEnhancing";

const ChatInterface = ({ chat, setChat, isExpanded }) => {
  const [prompt, setPrompt] = useState("");
  const messagesEndRef = useRef(null);
  const { generateResponse, loading } = useGemini();
  const { updateChat } = useUpdateChat(setChat);
  const dispatch = useDispatch();
  const [context, setContext] = useState("");
  const [oldCode, setOldCode] = useState("");
  const isContextVisible = !!context;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.promptsAndResponses]);

  const handleSendClick = async () => {
    if (context) {
      await HandleEnhance({
        prompt,
        oldCode,
        chat,
        setChat,
        updateChat,
        generateResponse,
      });
      setContext("");
    } else {
      await handleSend({ prompt, chat, setChat, updateChat, generateResponse });
    }

    setPrompt("");
  };

  const handleCodeDisplay = (code) => {
    dispatch(setCode(code));
  };
  const handleDoubleClick = (data) => {
    setContext(data.textOverview);
    setOldCode(`html: ${data.html}, css: ${data.css}, js: ${data.js}`);

    // console.log(data);
  };
  // console.log(oldCode);
  const removeContext = () => {
    setContext("");
  };

  return (
    <div
      className={`transition-all duration-500 flex flex-col bg-gradient-to-b from-gray-900 to-black text-gray-100 h-full ${
        isExpanded ? "opacity-0 hidden" : "flex-1 opacity-100"
      }`}
    >
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto min-h-0 custom-scrollbar">
        {chat?.promptsAndResponses?.map((entry, index) => (
          <div key={index} className="mb-6 last:mb-2">
            {/* User message */}
            <div className="p-4 rounded-lg bg-cyan-900 bg-opacity-50 text-white mb-4 shadow-lg">
              {entry.prompt}
            </div>
            {/* Response */}
            <div
              onDoubleClick={() => handleDoubleClick(entry.response)}
              className="relative p-4 rounded-lg bg-gray-800 bg-opacity-50 text-gray-200 shadow-lg cursor-pointer"
            >
              {entry.response.textOverview}
              <button
                onClick={() => handleCodeDisplay(entry.response)}
                className="absolute  bottom-2 right-2  px-1.5 py-0.5  bg-gray-600 bg-opacity-50 text-gray-300 hover:from-blue-600 hover:to-blue-800 rounded-lg text-sm shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <HiCode className="w-5 h-5" />
                {/* Preview */}
              </button>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* {isContextVisible && ( */}
        <div
          className={`relative h-auto  p-4 border-t border-gray-700 bg-gray-700 flex-shrink-0 rounded-t-lg overflow-hidden transition-all duration-300 ease-in-out transform ${
            isContextVisible ? "translate-y-0 opacity-50" : "translate-y-full opacity-0"
          }`}
        >
          {context}
          <button onClick={removeContext} className="absolute top-2 right-2">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      {/* )} */}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 bg-gray-900 flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-accent focus:border-accent placeholder-gray-400"
            disabled={!chat || loading}
            onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
          />
          <button
            onClick={handleSendClick}
            disabled={!chat || loading}
            className="px-4 py-2.5 text-white bg-accent hover:bg-hover_accent focus:ring-4 focus:ring-cyan-800 font-medium rounded-lg text-sm inline-flex items-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatInterface;
