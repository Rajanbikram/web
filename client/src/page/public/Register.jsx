import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./schema/authSchema";
import { useApi } from "../../hooks/useApi";
import "../../css/auth.css";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("user");
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "user" },
  });

  const { callApi, loading } = useApi();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  const handleRegister = async (userData) => {
    try {
      const res = await callApi("POST", "/auth/register", { ...userData, role: selectedRole });
      if (res.success) {
        // Save token and user
        localStorage.setItem('access_token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data));
        reset();

        alert("Registration successful!");

        // Role based redirect
        if (selectedRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      alert(err.message || "Registration failed!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Registration</h1>
        <div className="auth-title-underline"></div>

        {/* Role Selection Boxes */}
        <div className="role-selection">
          <div
            className={`role-box ${selectedRole === 'user' ? 'role-box-active' : ''}`}
            onClick={() => handleRoleSelect('user')}
          >
            <div className="role-box-icon">👤</div>
            <div className="role-box-label">User</div>
          </div>
          <div
            className={`role-box ${selectedRole === 'admin' ? 'role-box-active' : ''}`}
            onClick={() => handleRoleSelect('admin')}
          >
            <div className="role-box-icon">🛡️</div>
            <div className="role-box-label">Admin</div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="auth-input-group">
            <input {...register("name")} type="text" placeholder="Enter your name" className="auth-input" disabled={loading} />
            {errors.name && <span className="error-msg">{errors.name.message}</span>}
          </div>

          <div className="auth-input-group">
            <input {...register("email")} type="email" placeholder="Enter your email" className="auth-input" disabled={loading} />
            {errors.email && <span className="error-msg">{errors.email.message}</span>}
          </div>

          <div className="auth-input-group">
            <input {...register("password")} type="password" placeholder="Create a password" className="auth-input" disabled={loading} />
            {errors.password && <span className="error-msg">{errors.password.message}</span>}
          </div>

          <div className="auth-input-group">
            <input {...register("confirmPassword")} type="password" placeholder="Confirm a password" className="auth-input" disabled={loading} />
            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword.message}</span>}
          </div>

          <div className="auth-checkbox-row">
            <input type="checkbox" className="auth-checkbox" required />
            <label className="auth-checkbox-label">I accept all terms & conditions</label>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Registering..." : "Register Now"}
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