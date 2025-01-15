import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const ChatInterface = ({ onSendMessage, messages }) => {
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    if (prompt.trim()) {
      onSendMessage(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-secondary text-primary_text">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 mb-4 rounded-md ${
              msg.isUser ? 'bg-accent text-white' : 'bg-tertiary'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border flex items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          className="flex-1 bg-tertiary text-primary_text p-2 rounded-md"
        />
        <button
          onClick={handleSend}
          className="ml-4 bg-accent p-2 rounded-md text-white hover:bg-hover_accent"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
