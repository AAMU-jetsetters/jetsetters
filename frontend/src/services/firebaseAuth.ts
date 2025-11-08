import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';
import { auth } from '../config/firebase';

const googleProvider = new GoogleAuthProvider();

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export const firebaseAuthService = {
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
    } catch (error: unknown) {
      console.error('Signup error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      return { success: false, error: errorMessage };
    }
  },

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
    } catch (error: unknown) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      return { success: false, error: errorMessage };
    }
  },

  signInWithGoogle: async (): Promise<AuthResult> => {
    try {
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in successful:', result.user.email);
      return { success: true, user: result.user };
    } catch (error: unknown) {
      console.error('Google sign-in error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Google sign-in failed';
      return { success: false, error: errorMessage };
    }
  },

  logout: async (): Promise<AuthResult> => {
    try {
      await signOut(auth);
      console.log('User logged out');
      return { success: true };
    } catch (error: unknown) {
      console.error('Logout error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      return { success: false, error: errorMessage };
    }
  },

  getCurrentUser: (): User | null => {
    return auth.currentUser;
  },

  isAuthenticated: (): boolean => {
    return auth.currentUser !== null;
  },
};

