import { useState, useEffect } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import TwoFactorAuth from './components/TwoFactorAuth'
import CommunityLogin from './components/community/CommunityLogin'
import CommunitySignup from './components/community/CommunitySignup'
import AnomalyOverview from './pages/admin/AnomalyOverview'
import WaterSafetyOverview from './pages/community/WaterSafetyOverview'
import { auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import './App.css'

type Screen = 'login' | 'signup' | 'twofa-signup' | 'twofa-login' | 'success' | 'admin-dashboard' | 'community-dashboard' | 'community-login' | 'community-signup';
type FlowType = 'signup' | 'login';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('community-login')
  const [currentEmail, setCurrentEmail] = useState<string>('')
  const [flowType, setFlowType] = useState<FlowType>('login')
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsCheckingAuth(false)
      if (user) {
        setCurrentScreen('community-dashboard')
      } else {
        setCurrentScreen('community-login')
      }
    })

    return () => unsubscribe()
  }, [])

  const handleSignupSuccess = (email: string) => {
    setCurrentEmail(email)
    setFlowType('signup')
    setCurrentScreen('twofa-signup')
  }

  const handleLoginSuccess = (email: string) => {
    setCurrentEmail(email)
    setFlowType('login')
    setCurrentScreen('twofa-login')
  }

  const handleVerifySuccess = () => {
    if (flowType === 'signup') {
      console.log('Signup completed! Redirecting to login...')
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

  // Community auth handlers
  const handleCommunityLoginSuccess = () => {
    console.log('Community user logged in successfully')
    setCurrentScreen('community-dashboard')
  }

  const handleCommunitySignupSuccess = () => {
    console.log('Community user signed up successfully')
    setCurrentScreen('community-dashboard')
  }

  const handleNavigateToCommunityLogin = () => {
    setCurrentScreen('community-login')
    setCurrentEmail('')
  }

  const handleNavigateToCommunitySignup = () => {
    setCurrentScreen('community-signup')
    setCurrentEmail('')
  }

  const handleCommunityLogout = () => {
    setCurrentScreen('community-login')
    console.log('Community user logged out')
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

  if (isCheckingAuth) {
    return (
      <div className="app" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ color: '#a0a0a0' }}>Loading...</div>
      </div>
    )
  }

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

      {currentScreen === 'community-login' && (
        <CommunityLogin
          onLoginSuccess={handleCommunityLoginSuccess}
          onNavigateToSignup={handleNavigateToCommunitySignup}
        />
      )}

      {currentScreen === 'community-signup' && (
        <CommunitySignup
          onSignupSuccess={handleCommunitySignupSuccess}
          onNavigateToLogin={handleNavigateToCommunityLogin}
        />
      )}

      {currentScreen === 'community-dashboard' && <WaterSafetyOverview onLogout={handleCommunityLogout} />}
    </div>
  )
}

export default App
