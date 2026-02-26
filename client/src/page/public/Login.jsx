import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useApi } from '../../hooks/useAPi';
import '../../css/auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { callApi, loading } = useApi();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    try {
      const response = await callApi('POST', '/auth/login', form);

      if (response.success) {
        // Save token and full user data (with firstName/lastName)
        localStorage.setItem('access_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));

        // Role based redirect
        if (response.data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      alert(err.message || 'Login failed!');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        <div className="auth-title-underline"></div>

        <form onSubmit={onLogin}>
          <div className="auth-input-group">
            <input
              type="email"
              placeholder="Enter your email"
              className="auth-input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={loading}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="auth-input-group">
            <input
              type="password"
              placeholder="Enter your password"
              className="auth-input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              disabled={loading}
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <div className="auth-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" className="auth-checkbox" />
              <label className="auth-checkbox-label">Remember me</label>
            </div>
            <a href="#" className="auth-forgot">Forgot password?</a>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login Now'}
          </button>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Signup now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;