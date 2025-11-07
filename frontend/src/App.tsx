import { useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import TwoFactorAuth from './components/TwoFactorAuth'
import AnomalyOverview from './pages/admin/AnomalyOverview'
import './App.css'

type Screen = 'login' | 'signup' | 'twofa-signup' | 'twofa-login' | 'success' | 'admin-dashboard';
type FlowType = 'signup' | 'login';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login')
  const [currentEmail, setCurrentEmail] = useState<string>('')
  const [flowType, setFlowType] = useState<FlowType>('login')

  // Handle signup submission
  const handleSignupSuccess = (email: string) => {
    setCurrentEmail(email)
    setFlowType('signup')
    setCurrentScreen('twofa-signup')
  }

  // Handle login submission
  const handleLoginSuccess = (email: string) => {
    setCurrentEmail(email)
    setFlowType('login')
    setCurrentScreen('twofa-login')
  }

  // Handle 2FA verification success
  const handleVerifySuccess = () => {
    if (flowType === 'signup') {
      console.log('✅ Signup completed! Redirecting to login...')
      // After successful signup verification, redirect to login
      setTimeout(() => {
        setCurrentScreen('login')
        setCurrentEmail('')
        alert('Account created successfully! Please log in.')
      }, 500)
    } else {
      console.log('Login successful! Welcome to JetSetters!')
      setCurrentScreen('admin-dashboard')
    }
  }

  // Navigation handlers
  const handleNavigateToLogin = () => {
    setCurrentScreen('login')
    setCurrentEmail('')
  }

  const handleNavigateToSignup = () => {
    setCurrentScreen('signup')
    setCurrentEmail('')
  }

  const handleLogout = () => {
    setCurrentScreen('login')
    setCurrentEmail('')
    console.log('User logged out')
  }

  // Render success screen
  const renderSuccessScreen = () => (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1 className="success-title">Welcome to JetSetters!</h1>
        <p className="success-message">You have successfully logged in.</p>
        <button className="success-button" onClick={handleNavigateToLogin}>
          Log Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="app">
      {currentScreen === 'login' && (
        <Login 
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignup={handleNavigateToSignup}
        />
      )}
      
      {currentScreen === 'signup' && (
        <Signup 
          onSignupSuccess={handleSignupSuccess}
          onNavigateToLogin={handleNavigateToLogin}
        />
      )}
      
      {(currentScreen === 'twofa-signup' || currentScreen === 'twofa-login') && (
        <TwoFactorAuth 
          email={currentEmail}
          flowType={flowType}
          onVerifySuccess={handleVerifySuccess}
        />
      )}

      {currentScreen === 'success' && renderSuccessScreen()}
      
      {currentScreen === 'admin-dashboard' && <AnomalyOverview onLogout={handleLogout} />}
    </div>
  )
}

export default App
