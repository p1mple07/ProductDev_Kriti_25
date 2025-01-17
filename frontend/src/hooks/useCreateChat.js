import { useDispatch } from "react-redux";
import { createChatStart, createChatSuccess, createChatFailure } from "../redux/chat/chatSlice";
import { toast } from "sonner";

const useCreateChat = () => {
  const dispatch = useDispatch();

  const createChat = async (chatData) => {
    try {
      dispatch(createChatStart());
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(chatData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(createChatFailure(data.message));
        toast.error(data.message);
      } else {
        dispatch(createChatSuccess(data));
        toast.success("New chat created successfully");
      }
    } catch (error) {
      dispatch(createChatFailure(error.message));
      toast.error(error.message);
    }
  };

  return { createChat };
};

export default useCreateChat;