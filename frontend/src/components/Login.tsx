import { useState } from 'react';
import { authService } from '../services/authService';
import './Login.css';

interface LoginProps {
  onLoginSuccess?: (email: string) => void;
  onNavigateToSignup?: () => void;
}

function Login({ onLoginSuccess, onNavigateToSignup }: LoginProps) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = authService.login(emailOrUsername, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    console.log('Login initiated, 2FA code:', result.code);
    
    if (onLoginSuccess && result.user) {
      onLoginSuccess(result.user.email);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <div className="logo-circle">
            <span className="logo-icon">✈️</span>
          </div>
          <h2 className="brand-name">JetSetters</h2>
        </div>
        
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Log in to your account</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="emailOrUsername" className="form-label">
              Email or Username
            </label>
            <input
              type="text"
              id="emailOrUsername"
              className="form-input"
              placeholder="Enter your email or username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>

          <a href="#" className="forgot-password-link">
            Forgot password?
          </a>

          <div className="navigation-links">
            <span className="nav-text">Don't have an account?</span>
            <button 
              type="button" 
              className="nav-link"
              onClick={onNavigateToSignup}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

