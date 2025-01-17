import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchChatTitles from "../hooks/useFetchChatTitles";
import useDeleteChat from "../hooks/useDeleteChat";
import { TrashIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const { chats } = useFetchChatTitles();
  const { handleDeleteChat } = useDeleteChat();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter chats based on the search term
  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative group">
      {/* Sidebar */}
      <div className="absolute top-0 left-0 h-full bg-primary text-primary_text transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 z-10 w-64">
        <div className="p-4">
          <Link to="/" className="w-full block bg-accent hover:bg-hover_accent p-2 rounded-md mb-4 text-center">
            New Chat
          </Link>
          <input
            type="text"
            placeholder="Search chats"
            className="w-full p-2 mb-4 rounded-md border border-accent bg-tertiary text-primary_text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {filteredChats.map((chat) => (
              <li key={chat._id} className="flex justify-between items-center p-2 hover:bg-secondary cursor-pointer group">
                <Link to={`/chat/${chat._id}`} className="flex-1">
                  {chat.title}
                </Link>
                <button
                  onClick={() => handleDeleteChat(chat._id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Invisible hover area */}
      <div className="absolute top-0 left-0 h-full w-4 group-hover:w-64 z-0" />
    </div>
  );
};

export default Sidebar;