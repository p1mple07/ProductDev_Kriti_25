import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    chat: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchChatsStart: (state) => { state.loading = true; },
    fetchChatsSuccess: (state, action) => { state.chats = action.payload; state.loading = false; },
    fetchChatsFailure: (state, action) => { state.error = action.payload; state.loading = false; },

    fetchChatStart: (state) => { state.loading = true; },
    fetchChatSuccess: (state, action) => { state.chat = action.payload; state.loading = false; },
    fetchChatFailure: (state, action) => { state.error = action.payload; state.loading = false; },

    createChatStart: (state) => { state.loading = true; },
    createChatSuccess: (state, action) => { state.chats = [...state.chats, action.payload]; state.loading = false; },
    createChatFailure: (state, action) => { state.error = action.payload; state.loading = false; },

    deleteChatStart: (state) => { state.loading = true; },
    deleteChatSuccess: (state, action) => { state.chats = state.chats.filter(chat => chat.id !== action.payload); state.loading = false; },
    deleteChatFailure: (state, action) => { state.error = action.payload; state.loading = false; },

    deleteAllChatsStart: (state) => { state.loading = true; },
    deleteAllChatsSuccess: (state) => { state.chats = []; state.loading = false; },
    deleteAllChatsFailure: (state, action) => { state.error = action.payload; state.loading = false; },

    updateChatStart: (state) => { state.loading = true; },
    updateChatSuccess: (state, action) => { state.chat = action.payload; state.loading = false; },
    updateChatFailure: (state, action) => { state.error = action.payload; state.loading = false; },
  },
});

export const {
  fetchChatsStart, fetchChatsSuccess, fetchChatsFailure,
  fetchChatStart, fetchChatSuccess, fetchChatFailure,
  createChatStart, createChatSuccess, createChatFailure,
  deleteChatStart, deleteChatSuccess, deleteChatFailure,
  deleteAllChatsStart, deleteAllChatsSuccess, deleteAllChatsFailure,
  updateChatStart, updateChatSuccess, updateChatFailure
} = chatSlice.actions;

export default chatSlice.reducer;
