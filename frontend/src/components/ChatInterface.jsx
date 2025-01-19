import React, { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import useGemini from "../hooks/useGemini";
import useUpdateChat from "../hooks/useUpdateChat";
import { handleSend } from "../utils/handleSend";

const ChatInterface = ({ chat, setChat, isExpanded }) => {
  const [prompt, setPrompt] = useState("");
  const messagesEndRef = useRef(null);
  const { generateResponse, loading } = useGemini();
  const { updateChat } = useUpdateChat(setChat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.promptsAndResponses]);

  const handleSendClick = async () => {
    await handleSend({ prompt, chat, setChat, updateChat, generateResponse });
    setPrompt("");
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
            <div className="p-4 rounded-lg bg-gray-800 bg-opacity-50 text-gray-200 shadow-lg">
              {entry.response.textOverview}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 bg-gray-900 flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 placeholder-gray-400"
            disabled={!chat || loading}
            onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
          />
          <button
            onClick={handleSendClick}
            disabled={!chat || loading}
            className="px-4 py-2.5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-800 font-medium rounded-lg text-sm inline-flex items-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> 
            : <PaperAirplaneIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;