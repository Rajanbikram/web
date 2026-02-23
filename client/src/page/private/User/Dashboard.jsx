import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../utils/axios';
import { CURRENT_USER } from '../../../constants/user';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ skillsTeaching: 5, skillsLearning: 3, pendingRequests: 4, averageRating: 4.8 });
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    API.get(`/users/stats/${CURRENT_USER.id}`)
      .then((res) => setStats(res.data))
      .catch(() => {});

    API.get('/skills')
      .then((res) => setSkills(res.data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <>
      <h1 className="page-title">Welcome back, {CURRENT_USER.firstName}!</h1>
      <p className="page-subtitle">Here's what's happening with your skill exchanges.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <div className="stat-value">{stats.skillsTeaching}<span className="stat-change up">+2</span></div>
          <div className="stat-label">Skills Teaching</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div className="stat-value">{stats.skillsLearning}<span className="stat-change up">+1</span></div>
          <div className="stat-label">Skills Learning</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></svg>
          </div>
          <div className="stat-value">{stats.pendingRequests}</div>
          <div className="stat-label">Pending Requests</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div className="stat-value">{stats.averageRating}<span className="stat-change up">+0.2</span></div>
          <div className="stat-label">Average Rating</div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Popular Skills Near You</h2>
          <a className="section-link" onClick={() => navigate('/learn')}>
            View all{' '}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div className="skills-grid">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div className="skill-card" key={skill.id}>
                <div className="skill-card-header"></div>
                <div className="skill-card-body">
                  <span className="skill-category">{skill.category}</span>
                  <h3 className="skill-name">{skill.name}</h3>
                  <div className="skill-instructor">
                    <div className="avatar">
                      {skill.User ? `${skill.User.firstName[0]}${skill.User.lastName[0]}` : 'U'}
                    </div>
                    <span className="skill-instructor-name">
                      {skill.User ? `${skill.User.firstName} ${skill.User.lastName}` : 'Unknown'}
                    </span>
                  </div>
                  <div className="skill-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {skill.User?.location || 'N/A'}
                  </div>
                  <div className="skill-footer">
                    <div className="skill-rating">
                      <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <span className="skill-rating-value">{skill.rating || '4.8'}</span>
                      <span className="skill-rating-count">({skill.reviewCount || 0})</span>
                    </div>
                    <button className="btn btn-link">Request</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              {[
                { category: 'Technology', name: 'Python Programming', initials: 'SW', instructor: 'Sarah Wilson', location: 'New York, NY', rating: 4.9, reviews: 24 },
                { category: 'Music', name: 'Guitar Basics', initials: 'MC', instructor: 'Mike Chen', location: 'Los Angeles, CA', rating: 4.7, reviews: 18 },
                { category: 'Languages', name: 'Spanish Language', initials: 'MG', instructor: 'Maria Garcia', location: 'Miami, FL', rating: 4.8, reviews: 32 },
              ].map((s, i) => (
                <div className="skill-card" key={i}>
                  <div className="skill-card-header"></div>
                  <div className="skill-card-body">
                    <span className="skill-category">{s.category}</span>
                    <h3 className="skill-name">{s.name}</h3>
                    <div className="skill-instructor">
                      <div className="avatar">{s.initials}</div>
                      <span className="skill-instructor-name">{s.instructor}</span>
                    </div>
                    <div className="skill-location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {s.location}
                    </div>
                    <div className="skill-footer">
                      <div className="skill-rating">
                        <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span className="skill-rating-value">{s.rating}</span>
                        <span className="skill-rating-count">({s.reviews})</span>
                      </div>
                      <button className="btn btn-link">Request</button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="section">
        <div className="card">
          <h3 className="card-title">Quick Actions</h3>
          <div className="quick-actions">
            <button className="btn btn-primary" onClick={() => navigate('/teach')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              Add New Skill to Teach
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/learn')}>Browse Skills to Learn</button>
            <button className="btn btn-secondary" onClick={() => navigate('/profile')}>Update Profile</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;