import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './schema/authSchema';
import { useApi } from '../../hooks/useApi';
import '../../css/auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { callApi, loading } = useApi();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onLogin = async (data) => {
    try {
      const response = await callApi('POST', '/auth/login', data);
      if (response.success) {
        localStorage.setItem('access_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        reset();

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

        <form onSubmit={handleSubmit(onLogin)}>
          <div className="auth-input-group">
            <input {...register('email')} type="email" placeholder="Enter your email" className="auth-input" disabled={loading} />
            {errors.email && <span className="error-msg">{errors.email.message}</span>}
          </div>

          <div className="auth-input-group">
            <input {...register('password')} type="password" placeholder="Enter your password" className="auth-input" disabled={loading} />
            {errors.password && <span className="error-msg">{errors.password.message}</span>}
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