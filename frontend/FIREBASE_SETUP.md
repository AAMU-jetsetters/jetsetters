# Firebase Authentication Setup - Community Side

## Overview
The community side uses **Firebase Authentication** with support for:
- ✅ Email/Password authentication
- ✅ Google Sign-In
- ✅ Apple Sign-In

## 🔥 Firebase Installation

Firebase has been installed:
```bash
npm install firebase
```

## ⚙️ Firebase Configuration

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Follow the setup wizard
4. Enable Authentication in the Firebase Console

### 2. Enable Authentication Methods

In Firebase Console → Authentication → Sign-in method:
- ✅ Enable **Email/Password**
- ✅ Enable **Google**
- ✅ Enable **Apple** (requires Apple Developer account)

### 3. Get Firebase Credentials

1. In Firebase Console → Project Settings
2. Copy your Firebase configuration
3. Create a `.env` file in the `frontend` directory:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Important:** The `.env` file is gitignored for security. A `.env.template` file is provided as a reference.

### 4. Apple Sign-In Configuration (Optional)

For Apple Sign-In to work:
1. You need an Apple Developer account
2. Configure Apple Sign-In in Firebase Console
3. Add your app's Bundle ID
4. Upload the Apple Services ID

## 🏗️ Architecture

### Files Created:

```
frontend/src/
├── config/
│   └── firebase.ts              # Firebase initialization
├── services/
│   └── firebaseAuth.ts          # Firebase auth service
└── components/community/
    ├── CommunityLogin.tsx       # Login with social auth
    ├── CommunityLogin.css
    ├── CommunitySignup.tsx      # Signup with social auth
    └── CommunitySignup.css
```

## 🔐 Authentication Service API

### `firebaseAuthService.signupWithEmail(email, password)`
Creates a new user with email and password.

**Returns:**
```typescript
{
  success: boolean,
  user?: User,
  error?: string
}
```

### `firebaseAuthService.loginWithEmail(email, password)`
Signs in user with email and password.

### `firebaseAuthService.signInWithGoogle()`
Opens Google Sign-In popup.

### `firebaseAuthService.signInWithApple()`
Opens Apple Sign-In popup.

### `firebaseAuthService.logout()`
Signs out the current user.

### `firebaseAuthService.getCurrentUser()`
Returns the currently authenticated user or null.

### `firebaseAuthService.isAuthenticated()`
Returns boolean indicating if user is logged in.

## 🎨 Community Login/Signup Design

### Design Features:
- **Water droplet icon** (💧) instead of airplane
- **Blue gradient** (#3b82f6) for branding
- **"JetSetters Water"** branding
- **Social auth buttons** (Google and Apple)
- **Divider** with "or continue with email"
- **Email/password form** below social buttons
- **Purple theme** for buttons and links
- **Ubuntu font** throughout
- **Mobile-first responsive design**

### Login Page:
- Social auth buttons (Google, Apple)
- Email and password inputs
- "Forgot password?" link
- "Sign Up" navigation link

### Signup Page:
- Social auth buttons (Google, Apple)
- Email, password, confirm password inputs
- "Sign In" navigation link

## 🔄 Authentication Flow

### Community User Flow:
```
Community Login → Firebase Auth → Community Dashboard
       ↓
[Google/Apple/Email]
       ↓
   Dashboard
```

### Current Screens:
1. **community-login** - Login page with social auth
2. **community-signup** - Signup page with social auth
3. **community-dashboard** - Water Safety Overview

### Profile Tab Logout:
- Click Profile in bottom navigation
- Click "Logout" button
- Returns to community login screen

## 🚀 Testing

### Test with Email/Password:

1. **Start the app:**
```bash
cd frontend
npm run dev
```

2. **Sign Up:**
   - Click "Sign Up"
   - Enter email and password
   - Create account

3. **Sign In:**
   - Enter email and password
   - Click "Sign In"

### Test with Google (requires Firebase config):
- Click "Continue with Google"
- Select Google account
- Automatically signed in

### Test with Apple (requires Firebase config):
- Click "Continue with Apple"
- Authenticate with Apple ID
- Automatically signed in

## ⚠️ Important Notes

### Before Firebase Works:
1. ✅ Firebase is installed
2. ❌ You need to create a Firebase project
3. ❌ You need to add your credentials to `.env` file
4. ❌ You need to enable authentication methods in Firebase Console

### Without Firebase Configuration:
- Social auth buttons will show errors in console
- Email/password auth will fail
- You'll see Firebase initialization warnings

### To Use Mock Data (for development without Firebase):
The existing admin side uses mock authentication. You can test the community UI without Firebase by just viewing the pages.

## 🎯 Next Steps

1. **Create Firebase Project** at https://console.firebase.google.com/
2. **Enable Authentication Methods** (Email, Google, Apple)
3. **Copy credentials** to `.env` file
4. **Test authentication** flows
5. **Configure Apple Sign-In** (if needed)
6. **Add email verification** (optional)
7. **Implement password reset** functionality

## 📱 Mobile-First Features

✅ **Optimized for mobile screens**
✅ **Large touch targets** for buttons
✅ **Responsive social auth buttons**
✅ **Clear visual hierarchy**
✅ **Loading states** (disabled buttons while loading)
✅ **Error handling** with user-friendly messages
✅ **Ubuntu font** throughout

## 🔗 Integration with App

The community authentication is now fully integrated:
- CommunityLogin → WaterSafetyOverview (Home)
- CommunitySignup → WaterSafetyOverview (Home)
- Profile Tab → Logout → CommunityLogin

## 🎨 Design Differences from Admin Auth

| Feature | Admin | Community |
|---------|-------|-----------|
| Icon | ✈️ Airplane | 💧 Water Droplet |
| Color | 🔵 Teal (#14b8a6) | 🟣 Blue (#3b82f6) |
| Branding | "JetSetters" | "JetSetters Water" |
| Social Auth | ❌ No | ✅ Google & Apple |
| 2FA | ✅ Yes (mock) | ❌ No (Firebase handles) |
| Backend | Mock service | Firebase |

## 📚 Resources

- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Google Sign-In Setup](https://firebase.google.com/docs/auth/web/google-signin)
- [Apple Sign-In Setup](https://firebase.google.com/docs/auth/web/apple)

The community authentication system is now complete and ready to use once Firebase is configured! 🔐💧

