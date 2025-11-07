# JetSetters Authentication Flow

## Overview
This is a complete authentication system with **mock 2FA (Two-Factor Authentication)** implementation for a high-security travel application. The system uses predefined JSON data to simulate user authentication and SMS-based 2FA verification.

## 🔐 Security Features

- **Two-Factor Authentication** for both signup and login
- **Mock SMS codes** (displayed in browser console for testing)
- **Session-based verification** with expiring codes (5 minutes)
- **Password validation** (minimum 6 characters)
- **Phone number validation**
- **Duplicate user detection**

## 📱 Complete User Flows

### 1. Signup Flow
```
Signup Page → Enter Details → 2FA Verification → Success → Login Page
```

**Steps:**
1. User fills out signup form (email, username, phone, password)
2. System generates a 6-digit 2FA code
3. Code is logged to console (simulates SMS)
4. User enters code on 2FA screen
5. Upon successful verification, account is created
6. User is redirected to login page

### 2. Login Flow
```
Login Page → Enter Credentials → 2FA Verification → Success Screen
```

**Steps:**
1. User enters email/username and password
2. System validates credentials
3. If valid, generates 6-digit 2FA code
4. Code is logged to console (simulates SMS)
5. User enters code on 2FA screen
6. Upon successful verification, user sees success screen

## 🧪 Testing the System

### Pre-configured Test Users
The system comes with 2 test users you can use immediately:

**User 1:**
- Email: `john@example.com`
- Username: `johndoe`
- Password: `password123`
- Phone: `+1234567890`

**User 2:**
- Email: `jane@example.com`
- Username: `janedoe`
- Password: `password123`
- Phone: `+1987654321`

### Testing Signup
1. Click "Sign Up" on login page
2. Fill in new user details:
   - Email: `test@example.com`
   - Username: `testuser`
   - Phone: `+1555555555`
   - Password: `password123`
3. Click "Sign Up"
4. Check browser console for 2FA code
5. Enter the 6-digit code
6. You'll be redirected to login

### Testing Login
1. Use pre-configured credentials above
2. Enter email/username and password
3. Click "Log In"
4. Check browser console for 2FA code
5. Enter the 6-digit code
6. Success! You're logged in

### Testing 2FA Features
- **Resend Code**: Click "Resend Code" to generate a new code
- **Invalid Code**: Enter wrong code to see error message
- **Expired Code**: Wait 5 minutes, code will expire
- **Copy-Paste**: Copy a 6-digit code and paste into inputs

## 🗂️ File Structure

```
frontend/src/
├── services/
│   └── mockAuth.ts          # Mock authentication service
├── components/
│   ├── Login.tsx            # Login component
│   ├── Login.css            # Login styles
│   ├── Signup.tsx           # Signup component
│   ├── Signup.css           # Signup styles
│   ├── TwoFactorAuth.tsx    # 2FA verification component
│   └── TwoFactorAuth.css    # 2FA styles
├── App.tsx                  # Main app with flow management
├── App.css                  # Global app styles
└── index.css                # Base styles with Ubuntu font
```

## 🎨 Design System

### Colors
- **Primary (Teal)**: `#14b8a6` - Buttons, links, accents
- **Purple**: `#a78bfa` - Secondary actions, 2FA theme
- **Background**: `#000000` - Main background
- **Cards**: `#1a1a1a` - Card backgrounds
- **Inputs**: `#2a2a2a` - Input backgrounds
- **Text**: `#ffffff` - Primary text
- **Muted**: `#a0a0a0` - Secondary text
- **Error**: `#ef4444` - Error messages
- **Success**: `#10b981` - Success messages

### Typography
- **Font Family**: Ubuntu (Google Fonts)
- **Weights**: 300, 400, 500, 700

### Responsive Breakpoints
- Desktop: Default
- Tablet: 768px
- Mobile: 480px
- Small Mobile: 360px (2FA only)

## 🔧 Mock Auth Service API

### `mockAuthService.signup(email, username, password, phoneNumber)`
Creates a new user and generates 2FA code.

**Returns:**
```typescript
{
  success: boolean,
  message: string,
  code?: string  // For testing only
}
```

### `mockAuthService.verifySignupCode(email, code)`
Verifies the 2FA code for signup and creates the account.

### `mockAuthService.login(emailOrUsername, password)`
Validates user credentials and generates 2FA code for login.

**Returns:**
```typescript
{
  success: boolean,
  message: string,
  code?: string,  // For testing only
  user?: User
}
```

### `mockAuthService.verifyLoginCode(email, code)`
Verifies the 2FA code for login.

### `mockAuthService.resendCode(email)`
Generates and returns a new 2FA code.

## 🚀 Running the Application

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open in browser:**
```
http://localhost:5173
```

## 🔍 Console Output

The system logs helpful information to the console:

- 🔐 2FA codes (for testing)
- ✅ Success messages
- 📱 Phone numbers where "SMS" was sent
- ⚠️ Error messages

**Example console output:**
```
🔐 2FA Code for john@example.com: 123456
📱 Code sent to phone: +1234567890
✅ Login successful for: john@example.com
```

## 🎯 Key Features

1. ✅ **Complete authentication flow** (Signup → 2FA → Login → 2FA → Success)
2. ✅ **Mock 2FA system** with realistic code generation
3. ✅ **Error handling** with user-friendly messages
4. ✅ **Form validation** (passwords, phone numbers, etc.)
5. ✅ **Responsive design** for all screen sizes
6. ✅ **Ubuntu font** throughout the application
7. ✅ **Separated CSS** from React components
8. ✅ **Navigation** between Login and Signup
9. ✅ **Code expiration** (5-minute timeout)
10. ✅ **Session storage** for pending users

## 📝 Notes

- This is a **mock implementation** for demonstration purposes
- In production, 2FA codes should be sent via SMS/Email service
- The code should NOT be returned in the response
- Consider adding rate limiting and additional security measures
- User data is stored in memory (resets on page refresh)
- SessionStorage is used temporarily for pending signups

