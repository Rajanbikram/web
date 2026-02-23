import { Skill, User } from '../../Model/User/index.js';

// GET /api/skills
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll({
      include: [{ model: User, attributes: ['id', 'firstName', 'lastName', 'location'] }],
    });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/skills/user/:userId
export const getUserSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll({ where: { userId: req.params.userId } });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/skills
export const addSkill = async (req, res) => {
  try {
    const { name, category, description, experience, userId } = req.body;
    const skill = await Skill.create({ name, category, description, experience, userId });
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/skills/:id
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    await skill.update(req.body);
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/skills/:id
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    await skill.destroy();
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};