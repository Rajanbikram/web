import express from 'express';
import {
  getProfile,
  updateProfile,
  updateSettings,
  getUserStats,
} from '../../Controller/User/userController.js';

const router = express.Router();

router.get('/stats/:id', getUserStats);
router.get('/:id', getProfile);
router.put('/:id', updateProfile);
router.put('/:id/settings', updateSettings);

export default router;