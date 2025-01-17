import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchChatStart, fetchChatSuccess, fetchChatFailure } from "../redux/chat/chatSlice";

const useFetchChatById = (chatId) => {
  const dispatch = useDispatch();
  const [chat, setChat] = useState(null);

  useEffect(() => {
    if (!chatId) return;

    const fetchChat = async () => {
      try {
        dispatch(fetchChatStart());
        const res = await fetch(`/api/chat/${chatId}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(fetchChatFailure(data.message));
        } else {
          dispatch(fetchChatSuccess(data));
          setChat(data);
        }
      } catch (error) {
        dispatch(fetchChatFailure(error.message));
      }
    };

    fetchChat();
  }, [dispatch, chatId]);

  return { chat };
};

export default useFetchChatById;
