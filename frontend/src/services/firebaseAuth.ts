import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';
import { auth } from '../config/firebase';

// Initialize providers
const googleProvider = new GoogleAuthProvider();

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export const firebaseAuthService = {
  // Email/Password signup
  signupWithEmail: async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('User created:', userCredential.user.email);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  },

  // Email/Password login
  loginWithEmail: async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('User logged in:', userCredential.user.email);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  },

  // Google Sign-In
  signInWithGoogle: async (): Promise<AuthResult> => {
    try {
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in successful:', result.user.email);
      return { success: true, user: result.user };
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      return { success: false, error: error.message };
    }
  },

  // Sign out
  logout: async (): Promise<AuthResult> => {
    try {
      await signOut(auth);
      console.log('User logged out');
      return { success: true };
    } catch (error: any) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return auth.currentUser !== null;
  },
};

