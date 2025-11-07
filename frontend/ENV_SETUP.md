# Environment Variables Setup

## Firebase Configuration

To enable Firebase authentication for the community side, you need to create a `.env` file in the `frontend` directory.

### Step 1: Copy the template

Use the `.env.template` file as a reference (if it exists), or create a new `.env` file manually.

### Step 2: Add Firebase credentials

Create a file named `.env` in the `frontend/` directory with the following content:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 3: Get your Firebase credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the gear icon → Project settings
4. Scroll down to "Your apps"
5. Click "Add app" → Web (</>) icon
6. Register your app
7. Copy the config values to your `.env` file

### Example Firebase Config Object:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "jetsetters-water.firebaseapp.com",
  projectId: "jetsetters-water",
  storageBucket: "jetsetters-water.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Important Notes

⚠️ **Security:**
- Never commit the `.env` file to git
- The `.env` file is already in `.gitignore`
- Only share credentials securely with team members

⚠️ **Vite Environment Variables:**
- All variables must start with `VITE_` to be accessible in the app
- Restart the dev server after changing `.env`

## Testing Without Firebase

If you haven't set up Firebase yet, the app will still run but:
- Social auth buttons will show errors
- Email/password auth will fail
- You can still view the UI and navigation

To test the UI without Firebase, you can:
1. View the login/signup pages
2. Check the designs and layouts
3. The community dashboard pages work independently

## After Setup

Once you've added your Firebase credentials:
1. Restart the dev server: `npm run dev`
2. Test Google Sign-In
3. Test Apple Sign-In (requires Apple Developer setup)
4. Test Email/Password signup and login

## Enable Authentication Methods

In Firebase Console → Authentication → Sign-in method:

1. **Email/Password:**
   - Click "Email/Password"
   - Enable it
   - Save

2. **Google:**
   - Click "Google"
   - Enable it
   - Add support email
   - Save

3. **Apple:**
   - Click "Apple"
   - Enable it
   - Add your Services ID
   - Upload Apple credentials
   - Save

## Troubleshooting

### "Firebase not configured" error
- Check if `.env` file exists
- Verify all VITE_ variables are set
- Restart dev server

### Google Sign-In not working
- Verify Google is enabled in Firebase Console
- Check authorized domains in Firebase Console
- Add `localhost` to authorized domains for local testing

### Apple Sign-In not working
- Requires Apple Developer account ($99/year)
- Need to configure Services ID in Apple Developer Console
- Add redirect URLs in Firebase Console

## Next Steps

1. Create `.env` file with your Firebase credentials
2. Enable authentication methods in Firebase
3. Test all auth flows
4. Configure Apple Sign-In (optional)
5. Add email verification (optional)
6. Implement password reset flow

