// ✅ index.js bata import gar - associations load hunxa
import { User, Skill, SkillRequest } from '../../Model/User/index.js';
import AdminReport from '../../Model/Admin/ReportModel.js';

// GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalSkills = await Skill.count();
    const activeRequests = await SkillRequest.count({ where: { status: 'pending' } });
    const pendingReports = await AdminReport.count({ where: { status: 'pending' } });
    res.json({ totalUsers, totalSkills, activeRequests, pendingReports });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats', error: err.message });
  }
};

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt'],
    });
    const mapped = users.map(u => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      status: u.role === 'blocked' ? 'blocked' : 'active',
      role: u.role,
      joinDate: u.createdAt,
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// PATCH /api/admin/users/:id/block
const toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isBlocked = user.role === 'blocked';
    user.role = isBlocked ? 'user' : 'blocked';
    await user.save();
    res.json({
      message: `User ${isBlocked ? 'unblocked' : 'blocked'}`,
      user: {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        status: isBlocked ? 'active' : 'blocked',
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// GET /api/admin/skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll({
      include: [{ model: User, attributes: ['firstName', 'lastName'] }], // ✅ no 'as' - matches index.js
    });
    const mapped = skills.map(s => ({
      id: s.id,
      title: s.name,
      category: s.category,
      postedBy: s.User ? `${s.User.firstName} ${s.User.lastName}` : 'Unknown',
      date: s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'N/A',
      status: s.status || 'active',
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching skills', error: err.message });
  }
};

// DELETE /api/admin/skills/:id
const removeSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    await skill.destroy();
    res.json({ message: 'Skill removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing skill', error: err.message });
  }
};

// GET /api/admin/reports
const getAllReports = async (req, res) => {
  try {
    const reports = await AdminReport.findAll();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reports', error: err.message });
  }
};

// PATCH /api/admin/reports/:id
const resolveReport = async (req, res) => {
  try {
    const { status } = req.body;
    const report = await AdminReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    report.status = status;
    await report.save();
    res.json({ message: `Report ${status}`, report });
  } catch (err) {
    res.status(500).json({ message: 'Error updating report', error: err.message });
  }
};

export { getStats, getAllUsers, toggleBlockUser, getAllSkills, removeSkill, getAllReports, resolveReport };