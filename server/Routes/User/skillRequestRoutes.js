import express from 'express';
import {
  getAllSkills,
  getUserSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} from '../../Controller/User/skillController.js';

const router = express.Router();

router.get('/', getAllSkills);
router.get('/user/:userId', getUserSkills);
router.post('/', addSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

export default router;