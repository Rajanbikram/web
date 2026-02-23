import { useState, useEffect } from 'react';
import API from '../../../utils/axios';
import { CURRENT_USER } from '../../../constants/user';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: CURRENT_USER.firstName || 'John',
    lastName: CURRENT_USER.lastName || 'Doe',
    email: CURRENT_USER.email || 'john.doe@email.com',
    phone: '+1 234 567 8900',
    location: 'New York, NY',
    bio: 'Passionate about learning and teaching. I believe in the power of skill sharing to build stronger communities.',
    mode: 'Both Learn & Teach',
  });

  useEffect(() => {
    API.get(`/users/${CURRENT_USER.id}`)
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    try {
      await API.put(`/users/${CURRENT_USER.id}`, profile);
      setIsEditing(false);
    } catch (err) { console.error(err); }
  };

  const modes = ['Learn Skills', 'Teach Skills', 'Both Learn & Teach'];

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Manage your personal information</p>
        </div>
        <button className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="card mt-6">
        <h3 className="card-title">Profile Picture</h3>
        <div className="flex items-center gap-4">
          <div className="avatar-large">
            {profile.firstName?.[0]}{profile.lastName?.[0]}
            <button className="avatar-upload">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </button>
          </div>
          <div>
            <p className="text-sm" style={{ fontWeight: 500 }}>Upload a new photo</p>
            <p className="text-sm text-muted">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <h3 className="card-title">Personal Information</h3>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input type="text" className="form-input" value={profile.firstName || ''} disabled={!isEditing}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-input" value={profile.lastName || ''} disabled={!isEditing}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" value={profile.email || ''} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-input" value={profile.phone || ''} disabled={!isEditing}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input type="text" className="form-input" value={profile.location || ''} disabled={!isEditing}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea className="form-input" disabled={!isEditing} value={profile.bio || ''}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
        </div>
      </div>

      <div className="card mt-4">
        <h3 className="card-title">What would you like to do?</h3>
        <p className="text-sm text-muted">Choose how you want to participate in skill exchanges.</p>
        <div className="mode-selection">
          {modes.map((mode) => (
            <button key={mode} className={`mode-btn ${profile.mode === mode ? 'active' : ''}`}
              onClick={() => isEditing && setProfile({ ...profile, mode })}>
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;