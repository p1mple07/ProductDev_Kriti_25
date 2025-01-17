import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatInterface from "../components/ChatInterface";
import CodeDisplay from "../components/CodeDisplay";
import Header from "../components/Header";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Chat = () => {
  const [chats, setChats] = useState([
    { name: "Chat 1" },
    { name: "Chat 2" },
    { name: "Chat 3" },
  ]);
  const [messages, setMessages] = useState([]);
  const [codeSnippet, setCodeSnippet] = useState(null);
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  const onSendMessage = (text) => {
    setMessages([...messages, { text, isUser: true }]);

    // Simulating backend response with a dummy code snippet
    const dummyCode = {
      language: "javascript",
      content: `// Example JavaScript Code
        function greet(name) {
          return \`Hello, \${name}!\`;
        }
        console.log(greet("World"));
      `,
    };

    setCodeSnippet(dummyCode);
  };

  const toggleCodeExpand = () => {
    setIsCodeExpanded(!isCodeExpanded);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <Header />

      <div className="flex flex-1 bg-background text-primary_text">
        {/* Sidebar */}
        <Sidebar />

        {/* Chat Interface */}
        <div
          className={`flex flex-col flex-1 transition-all duration-500 ${
            codeSnippet ? (isCodeExpanded ? "w-0" : "w-2/5") : "w-full"
          }`}
        >
          <ChatInterface onSendMessage={onSendMessage} messages={messages} />
        </div>

        {/* Toggle Button for Code Panel */}
        {codeSnippet && (
          <div
            onClick={toggleCodeExpand}
            className={`absolute top-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ${
              isCodeExpanded ? "left-4" : "left-[40%]"
            }`}
          >
            {isCodeExpanded ? (
              <ChevronRightIcon className="w-6 h-6 text-primary_text hover:text-hover_accent" />
            ) : (
              <ChevronLeftIcon className="w-6 h-6 text-primary_text hover:text-hover_accent" />
            )}
          </div>
        )}

        {/* Code Display */}
        <CodeDisplay codeSnippet={codeSnippet} isExpanded={isCodeExpanded} />
      </div>
    </div>
  );
};

export default Chat;