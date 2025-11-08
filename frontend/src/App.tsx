import { useState, useEffect } from 'react'
import type { MultiFactorResolver } from 'firebase/auth'
import LandingPage from './components/LandingPage'
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

type Screen = 'landing' | 'login' | 'signup' | 'twofa-signup' | 'twofa-login' | 'success' | 'admin-dashboard' | 'community-dashboard' | 'community-login' | 'community-signup';
type FlowType = 'signup' | 'login';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing')
  const [currentEmail, setCurrentEmail] = useState<string>('')
  const [flowType, setFlowType] = useState<FlowType>('login')
  const [verificationId, setVerificationId] = useState<string>('')
  const [mfaResolver, setMfaResolver] = useState<MultiFactorResolver | undefined>(undefined)
  const [userId, setUserId] = useState<string>('')
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
  
    document.documentElement.setAttribute('data-theme', 'dark')
    document.body.setAttribute('data-theme', 'dark')
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsCheckingAuth(false)
      if (user) {
      
        if (currentScreen === 'community-login' || currentScreen === 'community-signup') {
          setCurrentScreen('community-dashboard')
        }
      } else {
        if (currentScreen === 'community-dashboard') {
          setCurrentScreen('community-login')
        }
      }
    })

    return () => unsubscribe()
  }, [currentScreen])

  const handleSignupSuccess = (email: string, verificationId?: string, userId?: string) => {
    setCurrentEmail(email)
    setFlowType('signup')
    setVerificationId(verificationId || '')
    setUserId(userId || '')
    setCurrentScreen('twofa-signup')
  }

  const handleLoginSuccess = async (email: string, resolver?: MultiFactorResolver) => {
    setCurrentEmail(email)
    setFlowType('login')
    setMfaResolver(resolver)
    
    if (resolver) {
      console.log('Sending MFA verification code...')
      
      const result = await import('./services/adminFirebaseAuth').then(module => 
        module.adminFirebaseAuth.sendMFAVerification(resolver, 'recaptcha-container-mfa-login', 0)
      );
      
      if (result.success && result.verificationId) {
        setVerificationId(result.verificationId)
        setCurrentScreen('twofa-login')
      } else {
        console.error('Failed to send MFA code:', result.error)
        alert('Failed to send verification code. Please try again.')
      }
    } else {
      setCurrentScreen('admin-dashboard')
    }
  }

  const handleVerifySuccess = () => {
    if (flowType === 'signup') {
      console.log('Signup completed! Redirecting to login...')
      setTimeout(() => {
        setCurrentScreen('login')
        setCurrentEmail('')
        alert('Account created successfully! Please log in.')
      }, 500)
    } else {
      console.log('Login successful! Welcome to Sentra!')
      setCurrentScreen('admin-dashboard')
    }
  }

  const handleNavigateToLogin = () => {
    setCurrentScreen('login')
    setCurrentEmail('')
  }

  const handleNavigateToSignup = () => {
    setCurrentScreen('signup')
    setCurrentEmail('')
  }

  const handleLogout = () => {
    setCurrentScreen('landing')
    setCurrentEmail('')
    setVerificationId('')
    setMfaResolver(undefined)
    setUserId('')
    console.log('User logged out')
  }

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
    setCurrentScreen('landing')
    console.log('Community user logged out')
  }

  const handleSelectCommunity = () => {
    setCurrentScreen('community-login')
  }

  const handleSelectCompany = () => {
    setCurrentScreen('login')
  }

  const renderSuccessScreen = () => (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1 className="success-title">Welcome to Sentra!</h1>
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
      <div id="recaptcha-container-mfa-login" style={{ display: 'none' }}></div>

      {currentScreen === 'landing' && (
        <LandingPage
          onSelectCommunity={handleSelectCommunity}
          onSelectCompany={handleSelectCompany}
        />
      )}
      
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
      
      {currentScreen === 'twofa-signup' && (
        <TwoFactorAuth 
          email={currentEmail}
          flowType="signup"
          verificationId={verificationId}
          userId={userId}
          onVerifySuccess={handleVerifySuccess}
        />
      )}

      {currentScreen === 'twofa-login' && (
        <TwoFactorAuth 
          email={currentEmail}
          flowType="login"
          verificationId={verificationId}
          resolver={mfaResolver}
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
