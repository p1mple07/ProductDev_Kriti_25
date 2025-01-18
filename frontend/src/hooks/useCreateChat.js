const useCreateChat = () => {
  const createChat = async (chatData) => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(chatData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      return await res.json();
    } catch (error) {
      console.error("Create chat error:", error.message);
      throw error;
    }
  };

  return { createChat };
};

export default useCreateChat;