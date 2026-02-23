import { SkillRequest, User, Skill } from '../../Model/User/index.js';
import { Op } from 'sequelize';

// GET /api/requests/user/:userId
export const getRequests = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const requests = await SkillRequest.findAll({
      where: { [Op.or]: [{ fromUserId: userId }, { toUserId: userId }] },
      include: [
        { model: User, as: 'FromUser', attributes: ['id', 'firstName', 'lastName'] },
        { model: User, as: 'ToUser', attributes: ['id', 'firstName', 'lastName'] },
        { model: Skill, attributes: ['name'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/requests
export const createRequest = async (req, res) => {
  try {
    const { skillId, fromUserId, toUserId } = req.body;
    const request = await SkillRequest.create({ skillId, fromUserId, toUserId });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/requests/:id
export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await SkillRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    await request.update({ status });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};