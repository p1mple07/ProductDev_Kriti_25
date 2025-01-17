import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteAllChatsStart, deleteAllChatsSuccess, deleteAllChatsFailure } from "../redux/chat/chatSlice";
import { toast } from "sonner";

const useDeleteAllChats = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteAllChats = async () => {
    setShowModal(false);
    try {
      dispatch(deleteAllChatsStart());
      const res = await fetch(`/api/chat/`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteAllChatsFailure(data.message));
        toast.error(data.message);
      } else {
        dispatch(deleteAllChatsSuccess());
        toast.success("All chats deleted successfully");
      }
    } catch (error) {
      dispatch(deleteAllChatsFailure(error.message));
      toast.error(error.message);
    }
  };

  return { showModal, setShowModal, handleDeleteAllChats };
};

export default useDeleteAllChats;
