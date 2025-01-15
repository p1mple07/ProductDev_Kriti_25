import Chat from '../models/chat.model.js';
import { errorHandler } from '../utils/error.js';

// Get all chat titles for a user
export const getAllChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ user: req.user.id }).select('title');
    res.status(200).json(chats);
  } catch (error) {
    next(errorHandler(500, 'Failed to fetch chats.'));
  }
};

// Get a single chat by ID
export const getChatById = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return next(errorHandler(404, 'Chat not found.'));

    if (chat.user.toString() !== req.user.id) {
      return next(errorHandler(403, 'You are not allowed to access this chat.'));
    }

    res.status(200).json(chat);
  } catch (error) {
    next(errorHandler(500, 'Failed to fetch chat.'));
  }
};

// Create a new chat
export const createChat = async (req, res, next) => {
  try {
    const { title, prompt, response } = req.body;

    const chat = await Chat.create({
      user: req.user.id,
      title,
      promptsAndResponses: [{ prompt, response }],
    });

    res.status(201).json(chat);
  } catch (error) {
    next(errorHandler(500, 'Failed to create chat.'));
  }
};

// Update a chat (add prompt-response)
export const updateChat = async (req, res, next) => {
  try {
    const { prompt, response } = req.body;

    const chat = await Chat.findById(req.params.id);
    if (!chat) return next(errorHandler(404, 'Chat not found.'));

    if (chat.user.toString() !== req.user.id) {
      return next(errorHandler(403, 'You are not allowed to update this chat.'));
    }

    chat.promptsAndResponses.push({ prompt, response });
    await chat.save();

    res.status(200).json(chat);
  } catch (error) {
    next(errorHandler(500, 'Failed to update chat.'));
  }
};

// Delete a chat
export const deleteChat = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return next(errorHandler(404, 'Chat not found.'));

    if (chat.user.toString() !== req.user.id) {
    return next(errorHandler(403, 'You are not allowed to delete this chat.'));
    }

    await Chat.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Chat deleted successfully.' });
  } catch (error) {
    next(errorHandler(500, 'Failed to delete chat.'));
  }
};