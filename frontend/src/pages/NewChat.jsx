import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import Header from '../components/Header';

const NewChat = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  const onSendMessage = (text) => {
    setMessages([...messages, { text, isUser: true }]);
    // Handle sending to backend
  };

  return (
    <div className="flex">
      <Sidebar chats={chats} onSelectChat={() => {}} onStartNewChat={() => {}} />
      <div className="flex-1 flex flex-col">
        <Header />
        <ChatInterface onSendMessage={onSendMessage} messages={messages} />
      </div>
    </div>
  );
};

export default NewChat;
