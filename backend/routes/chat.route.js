import express from 'express';
import { 
  getAllChats, 
  getChatById, 
  createChat, 
  updateChat, 
  deleteChat 
} from '../controllers/chat.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', verifyToken, getAllChats);
router.get('/:id', verifyToken, getChatById);
router.post('/', verifyToken, createChat);
router.put('/:id', verifyToken, updateChat);
router.delete('/:id', verifyToken, deleteChat);

export default router;