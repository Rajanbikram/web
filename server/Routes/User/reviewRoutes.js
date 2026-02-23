import express from 'express';
import { getReviews, addReview } from '../../Controller/User/reviewController.js';

const router = express.Router();

router.get('/:teacherId', getReviews);
router.post('/', addReview);

export default router;