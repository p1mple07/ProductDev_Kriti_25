import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatInterface from "../components/ChatInterface";
import CodeDisplay from "../components/CodeDisplay";
import Header from "../components/Header";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const NewChat = () => {
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
        <Sidebar
          chats={chats}
          onSelectChat={(chat) => console.log(chat)}
          onStartNewChat={() => console.log("New Chat Started")}
        />

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
          <button
            onClick={toggleCodeExpand}
            className={`absolute top-1/2 -translate-y-1/2 bg-accent text-primary_text p-2 rounded-md hover:bg-hover_accent transition-all duration-500 ${
              isCodeExpanded ? "left-4" : "left-[40%]"
            }`}
          >
            {isCodeExpanded ? (
              <ChevronRightIcon className="w-3 h-6" />
            ) : (
              <ChevronLeftIcon className="w-3 h-6" />
            )}
          </button>
        )}

        {/* Code Display */}
        <CodeDisplay codeSnippet={codeSnippet} isExpanded={isCodeExpanded} />
      </div>
    </div>
  );
};

export default NewChat;