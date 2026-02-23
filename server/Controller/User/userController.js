import { User } from '../../Model/User/index.js';
import { Skill, SkillRequest, Review } from '../../Model/User/index.js';

// GET /api/users/:id
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/users/:id
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, location, bio, mode } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.update({ firstName, lastName, phone, location, bio, mode });
    const { password, ...userData } = user.toJSON();
    res.json({ message: 'Profile updated successfully', user: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/users/:id/settings
export const updateSettings = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.update(req.body);
    res.json({ message: 'Settings saved successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/users/stats/:id
export const getUserStats = async (req, res) => {
  try {
    const userId = req.params.id;

    const skillsTeaching = await Skill.count({ where: { userId } });
    const pendingRequests = await SkillRequest.count({
      where: { toUserId: userId, status: 'pending' },
    });
    const reviews = await Review.findAll({ where: { teacherId: userId } });
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    res.json({
      skillsTeaching,
      skillsLearning: 3,
      pendingRequests,
      averageRating: parseFloat(avgRating.toFixed(1)),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};