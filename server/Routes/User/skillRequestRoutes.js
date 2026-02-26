import express from 'express';
import {
  getRequests,
  createRequest,
  updateRequestStatus,
} from '../../Controller/User/skillRequestController.js';

const router = express.Router();

router.get('/user/:userId', getRequests);
router.post('/', createRequest);
router.put('/:id', updateRequestStatus);

export default router;