import { useState, useEffect } from 'react';
import API from '../../../utils/axios';

function TeachSkills() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', description: '', experience: '' });

  const fetchSkills = () => {
    if (!user?.id) return;
    API.get(`/skills/user/${user.id}`)
      .then((res) => setSkills(res.data))
      .catch(() => {});
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleAdd = async () => {
    if (!form.name || !form.category) {
      alert('Skill name and category are required!');
      return;
    }
    try {
      await API.post('/skills', { ...form, userId: user?.id });
      setForm({ name: '', category: '', description: '', experience: '' });
      setShowModal(false);
      fetchSkills();
    } catch (err) {
      console.error(err);
      alert('Failed to add skill!');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await API.delete(`/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Teach Skills</h1>
          <p className="page-subtitle">Manage the skills you can teach others</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Skill
        </button>
      </div>

      <div className="skills-grid mt-6">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <div className="card" key={skill.id}>
              <div className="flex justify-between items-center">
                <span className="skill-category">{skill.category}</span>
                <div className="flex gap-2">
                  <button className="btn btn-icon btn-secondary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="btn btn-icon btn-secondary"
                    style={{ color: 'var(--destructive)' }}
                    onClick={() => handleDelete(skill.id)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="skill-name">{skill.name}</h3>
              <p className="text-sm text-muted mt-2">{skill.description}</p>
              <p className="text-sm text-muted mt-3">
                Experience: <strong>{skill.experience}</strong>
              </p>
            </div>
          ))
        ) : (
          <p className="text-muted">No skills added yet. Click "+ Add Skill" to add one!</p>
        )}
      </div>

      {/* Modal — inline style with z-index 9999 fix */}
      {showModal && (
        <div
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--card)',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '420px',
              margin: '16px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--foreground)' }}>
                Add New Skill
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '4px',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: 'var(--muted-foreground)',
                  fontSize: '20px',
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px' }}>
              <div className="form-group">
                <label className="form-label">Skill Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Python Programming"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  {['Technology', 'Languages', 'Music', 'Arts', 'Sports', 'Cooking', 'Business', 'Other'].map(
                    (c) => <option key={c} value={c}>{c}</option>
                  )}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  placeholder="Describe what you can teach..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Experience</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., 5 years"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                padding: '20px',
                borderTop: '1px solid var(--border)',
              }}
            >
              <button
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleAdd}
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeachSkills;