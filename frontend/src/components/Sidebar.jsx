import React from 'react';
import { ChatBubbleLeftIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

const Sidebar = ({ chats, onStartNewChat, onSelectChat }) => {
  return (
    <div className="w-64 h-screen bg-primary text-primary_text flex flex-col justify-between">
      <div>
        <button
          onClick={onStartNewChat}
          className="flex items-center bg-accent text-white w-full py-2 px-4 rounded-md mb-4 hover:bg-hover_accent"
        >
          <PlusCircleIcon className="w-6 h-6 mr-2" />
          Start New Chat
        </button>
        <ul className="space-y-2 px-4">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className="flex items-center p-2 rounded-md bg-tertiary hover:bg-accent cursor-pointer"
              onClick={() => onSelectChat(chat.id)}
            >
              <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
              {chat.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
