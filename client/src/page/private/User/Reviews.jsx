import { useState, useEffect } from 'react';
import API from '../../../utils/axios';
import { CURRENT_USER } from '../../../constants/user';

function Reviews() {
  const [reviewData, setReviewData] = useState({
    reviews: [], avgRating: 4.8, total: 4,
    breakdown: { 5: 3, 4: 1, 3: 0, 2: 0, 1: 0 },
  });

  useEffect(() => {
    API.get(`/reviews/${CURRENT_USER.id}`)
      .then((res) => { if (res.data.total > 0) setReviewData(res.data); })
      .catch(() => {});
  }, []);

  const renderStars = (rating) =>
    [1, 2, 3, 4, 5].map((s) => (
      <svg key={s} className={s <= rating ? 'filled' : 'empty'} viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));

  const defaultReviews = [
    { id: 1, initials: 'AJ', name: 'Alex Johnson', skill: 'JavaScript Programming', rating: 5, comment: 'John is an excellent teacher!', date: 'Jan 20, 2024' },
    { id: 2, initials: 'ED', name: 'Emma Davis', skill: 'Web Development', rating: 5, comment: 'Great experience learning web development.', date: 'Jan 15, 2024' },
    { id: 3, initials: 'TW', name: 'Tom Wilson', skill: 'Guitar', rating: 4, comment: 'Really enjoyed the guitar lessons!', date: 'Jan 10, 2024' },
    { id: 4, initials: 'LR', name: 'Lisa Rodriguez', skill: 'JavaScript Programming', rating: 5, comment: 'Fantastic instructor!', date: 'Jan 05, 2024' },
  ];

  const displayReviews = reviewData.reviews.length > 0
    ? reviewData.reviews.map((r) => ({
        id: r.id,
        initials: r.Reviewer ? `${r.Reviewer.firstName[0]}${r.Reviewer.lastName[0]}` : 'U',
        name: r.Reviewer ? `${r.Reviewer.firstName} ${r.Reviewer.lastName}` : 'User',
        skill: r.skillName, rating: r.rating, comment: r.comment,
        date: new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      }))
    : defaultReviews;

  const total = reviewData.total || 4;
  const breakdown = reviewData.breakdown;

  return (
    <>
      <h1 className="page-title">Reviews</h1>
      <p className="page-subtitle">See what others are saying about your teaching</p>

      <div className="review-stats">
        <div className="review-average">
          <div className="review-average-value">{reviewData.avgRating}</div>
          <div className="review-average-stars">{renderStars(Math.round(reviewData.avgRating))}</div>
          <div className="review-average-count">{total} reviews</div>
        </div>
        <div className="review-bars">
          {[5, 4, 3, 2, 1].map((star) => (
            <div className="review-bar-item" key={star}>
              <span className="review-bar-label">{star}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" style={{ color: 'var(--warning)', fill: 'var(--warning)' }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <div className="review-bar-track">
                <div className="review-bar-fill" style={{ width: `${total > 0 ? (breakdown[star] / total) * 100 : 0}%` }}></div>
              </div>
              <span className="review-bar-count">{breakdown[star] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2 mt-6">
        {displayReviews.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="review-header">
              <div className="review-author">
                <div className="avatar">{review.initials}</div>
                <div>
                  <div className="review-author-name">{review.name}</div>
                  <div className="review-author-skill">{review.skill}</div>
                </div>
              </div>
              <div className="review-stars">{renderStars(review.rating)}</div>
            </div>
            <div className="review-comment">"{review.comment}"</div>
            <div className="review-date">{review.date}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Reviews;