import { useState, useEffect } from 'react';
import API from '../../../utils/api'; // ✅ FIXED: api.js (token interceptor wala)

const DUMMY_SKILLS = [
  { id: 1, name: 'Python Programming', category: 'Technology', instructor: 'Sarah Wilson', initials: 'SW', location: 'New York, NY', rating: 4.9, reviews: 24, userId: null },
  { id: 2, name: 'Guitar Basics', category: 'Music', instructor: 'Mike Chen', initials: 'MC', location: 'Los Angeles, CA', rating: 4.7, reviews: 18, userId: null },
];

function LearnSkills() {
  // ✅ FIXED: useState use garyo taki re-render ma pani correct value aos
  const [currentUser] = useState(() => JSON.parse(localStorage.getItem('user')) || {});

  const [skills, setSkills] = useState(DUMMY_SKILLS);
  const [allSkills, setAllSkills] = useState(DUMMY_SKILLS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [requestedIds, setRequestedIds] = useState([]);

  const categories = ['All', 'Technology', 'Languages', 'Music', 'Arts', 'Sports', 'Cooking', 'Business'];

  useEffect(() => {
    API.get('/skills')
      .then((res) => {
        if (res.data.length > 0) {
          const mapped = res.data.map((s) => ({
            id: s.id,
            name: s.name,
            category: s.category,
            userId: s.userId,
            instructor: s.User ? `${s.User.firstName} ${s.User.lastName}` : 'Unknown',
            initials: s.User ? `${s.User.firstName[0]}${s.User.lastName[0]}` : 'U',
            location: s.User?.location || 'N/A',
            rating: s.rating || 4.5,
            reviews: s.reviewCount || 0,
          }));
          setAllSkills(mapped);
          setSkills(mapped);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const filtered = allSkills.filter((skill) => {
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setSkills(filtered);
  }, [searchQuery, selectedCategory, allSkills]);

  const handleRequest = async (skill) => {
    if (!skill.userId) {
      alert('Cannot send request for this skill!');
      return;
    }
    if (skill.userId === currentUser.id) {
      alert('You cannot request your own skill!');
      return;
    }
    if (requestedIds.includes(skill.id)) {
      alert('You already sent a request for this skill!');
      return;
    }
    try {
      await API.post('/requests', {
        skillId: skill.id,
        fromUserId: currentUser.id,
        toUserId: skill.userId,
      });
      setRequestedIds([...requestedIds, skill.id]);
      alert(`Request sent for "${skill.name}"!`);
    } catch (err) {
      alert('Failed to send request!');
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="page-title">Learn Skills</h1>
      <p className="page-subtitle">Browse and request skills from other users</p>

      <div className="filter-bar">
        <div className="search-box" style={{ width: 'auto', flex: 1, maxWidth: 400 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" placeholder="Search skills or instructors..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="card mt-4">
          <h4 className="text-sm mb-4" style={{ fontWeight: 500 }}>Category</h4>
          <div className="filter-chips">
            {categories.map((cat) => (
              <button key={cat} className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`} onClick={() => setSelectedCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm text-muted mt-4">Showing {skills.length} skills</p>

      <div className="skills-grid mt-4">
        {skills.map((skill) => (
          <div className="skill-card" key={skill.id}>
            <div className="skill-card-header"></div>
            <div className="skill-card-body">
              <span className="skill-category">{skill.category}</span>
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-instructor">
                <div className="avatar">{skill.initials}</div>
                <span className="skill-instructor-name">{skill.instructor}</span>
              </div>
              <div className="skill-location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {skill.location}
              </div>
              <div className="skill-footer">
                <div className="skill-rating">
                  <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span className="skill-rating-value">{skill.rating}</span>
                  <span className="skill-rating-count">({skill.reviews})</span>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleRequest(skill)}
                  disabled={requestedIds.includes(skill.id) || skill.userId === currentUser.id}
                  style={{ fontSize: '12px', padding: '6px 14px' }}
                >
                  {requestedIds.includes(skill.id) ? '✓ Requested' : 'Request'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LearnSkills;