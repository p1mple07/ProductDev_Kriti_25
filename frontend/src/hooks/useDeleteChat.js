import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteChatStart, deleteChatSuccess, deleteChatFailure } from "../redux/chat/chatSlice";
import { toast } from "sonner";

const useDeleteChat = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteChat = async (chatId) => {
    setShowModal(false);
    try {
      dispatch(deleteChatStart());
      const res = await fetch(`/api/chat/${chatId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteChatFailure(data.message));
        toast.error(data.message);
      } else {
        dispatch(deleteChatSuccess(chatId));
        toast.success("Chat deleted successfully");
      }
    } catch (error) {
      dispatch(deleteChatFailure(error.message));
      toast.error(error.message);
    }
  };

  return { showModal, setShowModal, handleDeleteChat };
};

export default useDeleteChat;
