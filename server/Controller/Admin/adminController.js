import AdminUser from '../../Model/Admin/UserModel.js';
import AdminSkill from '../../Model/Admin/SkillModel.js';
import AdminReport from '../../Model/Admin/ReportModel.js';

const getStats = async (req, res) => {
  try {
    const totalUsers = await AdminUser.count();
    const totalSkills = await AdminSkill.count();
    const activeRequests = await AdminSkill.count({ where: { status: 'active' } });
    const pendingReports = await AdminReport.count({ where: { status: 'pending' } });
    res.json({ totalUsers, totalSkills, activeRequests, pendingReports });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats', error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await AdminUser.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

const toggleBlockUser = async (req, res) => {
  try {
    const user = await AdminUser.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = user.status === 'active' ? 'blocked' : 'active';
    await user.save();
    res.json({ message: `User ${user.status}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

const getAllSkills = async (req, res) => {
  try {
    const skills = await AdminSkill.findAll();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching skills', error: err.message });
  }
};

const removeSkill = async (req, res) => {
  try {
    const skill = await AdminSkill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    await skill.destroy();
    res.json({ message: 'Skill removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing skill', error: err.message });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await AdminReport.findAll();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reports', error: err.message });
  }
};

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