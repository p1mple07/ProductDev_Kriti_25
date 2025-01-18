import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const ChatInterface = ({ chat, isExpanded }) => {
  const [prompt, setPrompt] = useState("");

  const handleSend = () => {
    if (prompt.trim()) {
      // Handle sending prompt logic
      setPrompt("");
    }
  };

  return (
    <div
      className={`transition-all duration-500 flex flex-col bg-gradient-to-b from-[#0A0F14] to-black text-primary_text ${
        isExpanded ? "opacity-0 h-0 hidden" : "flex-1 opacity-100"
      }`}
    >
      {/* Chat Messages (Scrollable) */}
      <div className="flex-1 p-4 overflow-y-auto">
        {chat?.promptsAndResponses?.map((entry, index) => (
          <div key={index} className="mb-4">
            <div className="p-4 rounded-md bg-accent text-white mb-2">{entry.prompt}</div>
            <div className="p-4 rounded-md bg-tertiary">{entry.response.textOverview}</div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border flex items-center bg-secondary">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          className="flex-1 bg-tertiary text-primary_text p-2 rounded-md focus:ring-2 focus:ring-accent"
          disabled={!chat}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onMouseDown={handleSend}
          className="ml-4 bg-accent p-2 rounded-md text-white hover:bg-hover_accent disabled:opacity-50"
          disabled={!chat}
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;