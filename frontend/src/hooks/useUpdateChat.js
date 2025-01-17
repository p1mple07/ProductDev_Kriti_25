import { useDispatch } from "react-redux";
import { updateChatStart, updateChatSuccess, updateChatFailure } from "../redux/chat/chatSlice";
import { toast } from "sonner";

const useUpdateChat = () => {
  const dispatch = useDispatch();

  const updateChat = async (chatId, updatedData) => {
    try {
      dispatch(updateChatStart());
      const res = await fetch(`/api/chat/${chatId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateChatFailure(data.message));
        toast.error(data.message);
      } else {
        dispatch(updateChatSuccess(data));
        toast.success("Chat updated successfully");
      }
    } catch (error) {
      dispatch(updateChatFailure(error.message));
      toast.error(error.message);
    }
  };

  return { updateChat };
};

export default useUpdateChat;
