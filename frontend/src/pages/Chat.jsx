import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import Header from '../components/Header';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch chat data by ID
    const fetchChatData = async () => {
      const response = await fetch(`/api/chat/${id}`);
      const data = await response.json();
      setMessages(data.messages);
    };

    fetchChatData();
  }, []);

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

export default Chat;
