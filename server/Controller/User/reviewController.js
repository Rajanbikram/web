import { Review, User } from '../../Model/User/index.js';

// GET /api/reviews/:teacherId
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { teacherId: req.params.teacherId },
      include: [
        { model: User, as: 'Reviewer', attributes: ['id', 'firstName', 'lastName'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    const total = reviews.length;
    const avgRating =
      total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => breakdown[r.rating]++);

    res.json({ reviews, avgRating: parseFloat(avgRating.toFixed(1)), total, breakdown });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/reviews
export const addReview = async (req, res) => {
  try {
    const { reviewerId, teacherId, skillName, rating, comment } = req.body;
    const review = await Review.create({ reviewerId, teacherId, skillName, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};