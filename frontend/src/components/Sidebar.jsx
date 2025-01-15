import React from 'react';

const Sidebar = ({ chats, onSelectChat, onStartNewChat }) => {
  return (
    <div className="relative group">
      {/* Sidebar */}
      <div
        className="absolute top-0 left-0 h-full bg-primary text-primary_text transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 z-10 w-64"
      >
        <div className="p-4">
          <button
            onClick={onStartNewChat}
            className="w-full bg-accent hover:bg-hover_accent p-2 rounded-md mb-4"
          >
            New Chat
          </button>
          <ul>
            {chats.map((chat, index) => (
              <li
                key={index}
                onClick={() => onSelectChat(chat)}
                className="p-2 hover:bg-secondary cursor-pointer"
              >
                {chat.name}
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
