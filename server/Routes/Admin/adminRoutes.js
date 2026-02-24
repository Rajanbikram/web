import express from 'express';
import {
  getStats,
  getAllUsers,
  toggleBlockUser,
  getAllSkills,
  removeSkill,
  getAllReports,
  resolveReport,
} from '../../Controller/Admin/adminController.js';

const router = express.Router();

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/block', toggleBlockUser);
router.get('/skills', getAllSkills);
router.delete('/skills/:id', removeSkill);
router.get('/reports', getAllReports);
router.patch('/reports/:id', resolveReport);

export default router;