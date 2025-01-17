import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchChatsStart, fetchChatsSuccess, fetchChatsFailure } from "../redux/chat/chatSlice";

const useFetchChatTitles = () => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChatTitles = async () => {
      try {
        dispatch(fetchChatsStart());
        const res = await fetch("/api/chat/", {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(fetchChatsFailure(data.message));
        } else {
          dispatch(fetchChatsSuccess(data));
          setChats(data);
        }
      } catch (error) {
        dispatch(fetchChatsFailure(error.message));
      }
    };

    fetchChatTitles();
  }, [dispatch]);

  return { chats };
};

export default useFetchChatTitles;
