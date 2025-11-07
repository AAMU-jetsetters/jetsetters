import { useState } from 'react';
import { authService } from '../services/authService';
import './Signup.css';

interface SignupProps {
  onSignupSuccess?: (email: string) => void;
  onNavigateToLogin?: () => void;
}

function Signup({ onSignupSuccess, onNavigateToLogin }: SignupProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!phoneNumber.match(/^\+?[1-9]\d{1,14}$/)) {
      setError('Please enter a valid phone number');
      return;
    }

    const result = authService.signup(email, username, password, phoneNumber);

    if (!result.success) {
      setError(result.message);
      return;
    }

    console.log('Signup initiated, 2FA code:', result.code);
    
    if (onSignupSuccess) {
      onSignupSuccess(email);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="logo-section">
          <div className="logo-circle">
            <span className="logo-icon">✈️</span>
          </div>
          <h2 className="brand-name">JetSetters</h2>
        </div>
        
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join our secure travel community</p>
        
        <form onSubmit={handleSubmit} className="signup-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="form-input"
              placeholder="+1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          <div className="navigation-links">
            <span className="nav-text">Already have an account?</span>
            <button 
              type="button" 
              className="nav-link"
              onClick={onNavigateToLogin}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

