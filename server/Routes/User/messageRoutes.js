import express from 'express';
import {
  getConversations,
  getMessages,
  sendMessage,
} from '../../Controller/User/messageController.js';

const router = express.Router();

router.get('/conversations/:userId', getConversations);
router.get('/:userId/:otherUserId', getMessages);
router.post('/', sendMessage);

export default router;