import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema, signupSchema } from './schema/authSchema';
import { useApi } from '../../hooks/useApi';
import '../../css/auth.css';

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const { callApi, loading, error } = useApi();
  const navigate = useNavigate();

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
    reset: resetSignup,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    reset: resetLogin,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSignup = async (data) => {
    try {
      const response = await callApi('POST', '/auth/register', data);
      
      if (response.success) {
        alert('Registration successful! Please login.');
        localStorage.setItem('access_token', response.data.token);
        resetSignup();
        setIsActive(false);
      }
    } catch (err) {
      alert(err.message || 'Registration failed!');
    }
  };

  const onLogin = async (data) => {
    try {
      const response = await callApi('POST', '/auth/login', data);
      
      if (response.success) {
        localStorage.setItem('access_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        alert('Login successful!');
        resetLogin();
        navigate('/product');  // ✅ FIXED: /dashboard → /product
      }
    } catch (err) {
      alert(err.message || 'Login failed!');
    }
  };

  return (
    <div className="auth-page">
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSubmitSignup(onSignup)}>
            <h1>Create Account</h1>
            <span>Use your email for registration</span>
            
            <input
              type="text"
              placeholder="Enter your full name"
              {...registerSignup('name')}
              disabled={loading}
            />
            {errorsSignup.name && (
              <span className="error">{errorsSignup.name.message}</span>
            )}

            <input
              type="email"
              placeholder="Enter your email"
              {...registerSignup('email')}
              disabled={loading}
            />
            {errorsSignup.email && (
              <span className="error">{errorsSignup.email.message}</span>
            )}

            <input
              type="password"
              placeholder="Enter your password"
              {...registerSignup('password')}
              disabled={loading}
            />
            {errorsSignup.password && (
              <span className="error">{errorsSignup.password.message}</span>
            )}

            <input
              type="password"
              placeholder="Confirm your password"
              {...registerSignup('confirmPassword')}
              disabled={loading}
            />
            {errorsSignup.confirmPassword && (
              <span className="error">{errorsSignup.confirmPassword.message}</span>
            )}

            {error && <span className="error">{error}</span>}

            <button type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleSubmitLogin(onLogin)}>
            <h1>Sign In</h1>
            <span>Use your email and password</span>

            <input
              type="email"
              placeholder="Email"
              {...registerLogin('email')}
              disabled={loading}
            />
            {errorsLogin.email && (
              <span className="error">{errorsLogin.email.message}</span>
            )}

            <input
              type="password"
              placeholder="Password"
              {...registerLogin('password')}
              disabled={loading}
            />
            {errorsLogin.password && (
              <span className="error">{errorsLogin.password.message}</span>
            )}

            {error && <span className="error">{error}</span>}

            <a href="#">Forget Your Password?</a>
            <button type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button
                className="hidden"
                type="button"
                onClick={() => setIsActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button
                className="hidden"
                type="button"
                onClick={() => setIsActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;