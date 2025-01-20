import React, { useEffect, useState } from "react";
import { PaperAirplaneIcon, PaperClipIcon, SparklesIcon } from "@heroicons/react/24/solid";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { handleChatCreation } from "../utils/handleChatCreation";
import useCreateChat from "../hooks/useCreateChat";
import useGemini from "../hooks/useGemini";

const NewChat = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { createChat, loading, setLoading} = useCreateChat();
  const { generateResponse } = useGemini();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening");
  }, []);

  const handleSendMessage = async () => {
    setLoading(true)
    if (!userPrompt.trim() && !file) {
      toast.warning("Please enter a prompt or upload a file.");
      setLoading(false)
      return;
    }

    await handleChatCreation({
      prompt: userPrompt,
      file,
      createChat,
      generateResponse,
    });

    setUserPrompt("");
    setFile(null);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      if (uploadedFile.type !== "text/plain") {
        toast.error("Only .txt files are supported.");
        return;
      }
      setFile(uploadedFile);
    }
  };

  const suggestedPrompts = [
    "Generate a modern website layout",
    "Create a portfolio site with a contact form",
    "Build a responsive landing page",
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-secondary to-background text-primary_text">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 justify-center items-center px-6 -mt-12"> 
          {/* Shifted Upward */}
          <div className="text-3xl font-semibold mb-4 flex items-center gap-2">
            ✨ {greeting}, {currentUser.username}
          </div>

          <p className="text-secondary_text text-center mb-6">
            Enter your website idea below or select a suggestion.
          </p>

          {/* Suggested Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full max-w-3xl">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setUserPrompt(prompt)}
                className="flex items-center gap-2 px-4 py-2 bg-tertiary text-primary_text rounded-lg hover:bg-gray-700 transition-all shadow-md"
              >
                <SparklesIcon className="w-5 h-5 text-accent" />
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Box */}
          <div className="w-full max-w-2xl flex flex-col bg-secondary rounded-2xl p-3 shadow-lg">
            {/* Expanding Input Field with Custom Scrollbar */}
            <textarea
              placeholder="Describe your website idea..."
              className="w-full bg-transparent outline-none text-lg p-3 resize-none overflow-y-auto max-h-64 custom-scrollbar"
              rows={2}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              style={{ minHeight: "48px", height: "auto" }}
            />

            {/* File Upload & Send Button */}
            <div className="flex justify-between items-center mt-3">
              {/* File Upload */}
              <label className="cursor-pointer flex items-center gap-2">
                <PaperClipIcon className="w-6 h-6 text-gray-400" />
                <input type="file" className="hidden" onChange={handleFileUpload} />
                {file && <span className="text-gray-300">{file.name}</span>}
              </label>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={loading}
                className={`px-4 py-2 rounded-full transition-all ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-accent text-primary_text hover:bg-hover_accent"
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-primary_text border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <PaperAirplaneIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChat;