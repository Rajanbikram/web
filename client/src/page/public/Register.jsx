import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useAPi';
import '../../css/auth.css';

const Register = () => {
  const [selectedRole, setSelectedRole] = useState('user');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { callApi, loading } = useApi();

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    try {
      const res = await callApi('POST', '/auth/register', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        role: selectedRole,
      });

      if (res.success) {
        localStorage.setItem('access_token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data));

        alert('Registration successful!');

        if (selectedRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      alert(err.message || 'Registration failed!');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Registration</h1>
        <div className="auth-title-underline"></div>

        {/* Role Selection */}
        <div className="role-selection">
          <div
            className={`role-box ${selectedRole === 'user' ? 'role-box-active' : ''}`}
            onClick={() => setSelectedRole('user')}
          >
            <div className="role-box-icon">👤</div>
            <div className="role-box-label">User</div>
          </div>
          <div
            className={`role-box ${selectedRole === 'admin' ? 'role-box-active' : ''}`}
            onClick={() => setSelectedRole('admin')}
          >
            <div className="role-box-icon">🛡️</div>
            <div className="role-box-label">Admin</div>
          </div>
        </div>

        <form onSubmit={handleRegister} autoComplete="off">
          <div className="auth-input-group">
            <input
              type="text"
              placeholder="Enter your first name"
              className="auth-input"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              disabled={loading}
              autoComplete="off"
            />
            {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
          </div>

          <div className="auth-input-group">
            <input
              type="text"
              placeholder="Enter your last name"
              className="auth-input"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              disabled={loading}
              autoComplete="off"
            />
            {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
          </div>

          <div className="auth-input-group">
            <input
              type="email"
              placeholder="Enter your email"
              className="auth-input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={loading}
              autoComplete="off"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="auth-input-group">
            <input
              type="password"
              placeholder="Create a password"
              className="auth-input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              disabled={loading}
              autoComplete="new-password"
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <div className="auth-input-group">
            <input
              type="password"
              placeholder="Confirm your password"
              className="auth-input"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              disabled={loading}
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
          </div>

          <div className="auth-checkbox-row">
            <input type="checkbox" className="auth-checkbox" required />
            <label className="auth-checkbox-label">I accept all terms & conditions</label>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register Now'}
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;