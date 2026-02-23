import { useState, useEffect } from 'react';
import API from '../../../utils/axios';
import { CURRENT_USER } from '../../../constants/user';

function TeachSkills() {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', description: '', experience: '' });

  const fetchSkills = () => {
    API.get(`/skills/user/${CURRENT_USER.id}`)
      .then((res) => setSkills(res.data))
      .catch(() => {});
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleAdd = async () => {
    try {
      await API.post('/skills', { ...form, userId: CURRENT_USER.id });
      setForm({ name: '', category: '', description: '', experience: '' });
      setShowModal(false);
      fetchSkills();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/skills/${id}`);
      fetchSkills();
    } catch (err) { console.error(err); }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Teach Skills</h1>
          <p className="page-subtitle">Manage the skills you can teach others</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          Add Skill
        </button>
      </div>

      <div className="skills-grid mt-6">
        {skills.length > 0 ? skills.map((skill) => (
          <div className="card" key={skill.id}>
            <div className="flex justify-between items-center">
              <span className="skill-category">{skill.category}</span>
              <div className="flex gap-2">
                <button className="btn btn-icon btn-secondary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button className="btn btn-icon btn-secondary" style={{ color: 'var(--destructive)' }} onClick={() => handleDelete(skill.id)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
            <h3 className="skill-name">{skill.name}</h3>
            <p className="text-sm text-muted mt-2">{skill.description}</p>
            <p className="text-sm text-muted mt-3">Experience: <strong>{skill.experience}</strong></p>
          </div>
        )) : (
          <>
            {[{ category: 'Technology', name: 'JavaScript Programming', desc: 'Modern JavaScript including ES6+, React, and Node.js', exp: '5 years' },
              { category: 'Music', name: 'Guitar', desc: 'Acoustic and electric guitar for beginners to intermediate', exp: '8 years' }].map((s, i) => (
              <div className="card" key={i}>
                <div className="flex justify-between items-center">
                  <span className="skill-category">{s.category}</span>
                  <div className="flex gap-2">
                    <button className="btn btn-icon btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                    <button className="btn btn-icon btn-secondary" style={{ color: 'var(--destructive)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                  </div>
                </div>
                <h3 className="skill-name">{s.name}</h3>
                <p className="text-sm text-muted mt-2">{s.desc}</p>
                <p className="text-sm text-muted mt-3">Experience: <strong>{s.exp}</strong></p>
              </div>
            ))}
          </>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Add New Skill</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Skill Name</label>
                <input type="text" className="form-input" placeholder="e.g., Python Programming"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select category</option>
                  {['Technology','Languages','Music','Arts','Sports','Cooking','Business','Other'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" placeholder="Describe what you can teach..."
                  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Experience</label>
                <input type="text" className="form-input" placeholder="e.g., 5 years"
                  value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd}>Add Skill</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeachSkills;