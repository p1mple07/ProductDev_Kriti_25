import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon, PaperClipIcon, SparklesIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const NewChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const handleSendMessage = () => {
    if (message.trim() === "" && !file) return;

    const newMessage = {
      text: message,
      isUser: true,
      file: file ? file.name : null,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    setFile(null);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const suggestedPrompts = [
    "Generate an interview question",
    "Summarize this document",
    "Help me debug my code",
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#0A0F14] to-black text-primary_text">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar (Hidden by default, shown on hover) */}
          <Sidebar />

        {/* Main Chat Area */}
        <div className="flex flex-col flex-1 justify-center items-center px-6">
          <div className="text-3xl font-semibold mb-4">✨ {greeting}, {currentUser.username}</div>

          {/* Welcome Message */}
          <p className="text-secondary_text text-center mb-6">
            Start a new conversation or choose from the suggestions below.
          </p>

          {/* Suggested Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setMessage(prompt)}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary_text rounded-lg hover:bg-tertiary transition-all"
              >
                <SparklesIcon className="w-5 h-5 text-accent" />
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Box */}
          <div className="w-full max-w-xl h-28 flex items-center bg-secondary rounded-3xl p-3 shadow-lg relative">
            {/* File Upload Button */}
            <label className="cursor-pointer mr-2">
              <PaperClipIcon className="w-6 h-6 text-primary_text" />
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>

            {/* Input Field */}
            <input
              type="text"
              placeholder="How can I help you today?"
              className="flex-1 bg-transparent outline-none text-lg px-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              className="bg-accent text-white p-2 rounded-full hover:bg-hover_accent transition-all"
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </div>

          {/* File Preview (Absolute Positioning) */}
          {file && (
            <div className="absolute bottom-60 bg-tertiary px-3 py-1 rounded-lg text-secondary_text flex items-center gap-2">
              📄 {file.name}
              <XMarkIcon className="w-5 h-5 text-red-400 cursor-pointer" onClick={() => setFile(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewChat;