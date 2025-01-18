const useUpdateChat = () => {
  const updateChat = async (chatId, updatedData) => {
    try {
      const res = await fetch(`/api/chat/${chatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      return await res.json();
    } catch (error) {
      console.error("Update chat error:", error.message);
      throw error;
    }
  };

  return { updateChat };
};

export default useUpdateChat;