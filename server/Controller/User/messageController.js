import { Message, User } from '../../Model/User/index.js';
import { Op } from 'sequelize';

// GET /api/messages/conversations/:userId
export const getConversations = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const messages = await Message.findAll({
      where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
      include: [
        { model: User, as: 'Sender', attributes: ['id', 'firstName', 'lastName'] },
        { model: User, as: 'Receiver', attributes: ['id', 'firstName', 'lastName'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    const conversationMap = {};
    messages.forEach((msg) => {
      const partnerId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      if (!conversationMap[partnerId]) {
        conversationMap[partnerId] = {
          partnerId,
          partnerName:
            msg.senderId === userId
              ? `${msg.Receiver.firstName} ${msg.Receiver.lastName}`
              : `${msg.Sender.firstName} ${msg.Sender.lastName}`,
          lastMessage: msg.text,
          updatedAt: msg.createdAt,
          unreadCount: 0,
        };
      }
      if (!msg.read && msg.receiverId === userId) {
        conversationMap[partnerId].unreadCount++;
      }
    });

    res.json(Object.values(conversationMap));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/messages/:userId/:otherUserId
export const getMessages = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      },
      order: [['createdAt', 'ASC']],
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/messages
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    const message = await Message.create({ senderId, receiverId, text });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};