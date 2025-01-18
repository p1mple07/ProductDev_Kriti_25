import { toast } from "sonner";

const useDeleteChat = () => {
  const handleDeleteChat = async (chatId) => {
    try {
      const res = await fetch(`/api/chat/${chatId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      toast.success("Chat deleted successfully!");
    } catch (error) {
      console.error("Delete chat error:", error.message);
      toast.error(`Failed to delete chat: ${error.message}`);
      throw error;
    }
  };

  return { handleDeleteChat };
};

export default useDeleteChat;