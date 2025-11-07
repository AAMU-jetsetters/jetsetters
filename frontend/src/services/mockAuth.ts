// Mock authentication service with predefined users and 2FA codes
export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
  isVerified: boolean;
}

interface TwoFactorCode {
  email: string;
  code: string;
  expiresAt: number;
}

// Mock database of users
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    username: 'johndoe',
    password: 'password123',
    phoneNumber: '+1234567890',
    isVerified: true,
  },
  {
    id: '2',
    email: 'jane@example.com',
    username: 'janedoe',
    password: 'password123',
    phoneNumber: '+1987654321',
    isVerified: true,
  },
];

// Mock 2FA codes storage
const twoFactorCodes: TwoFactorCode[] = [];

// Generate a random 6-digit code
const generateCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Mock Auth Service
export const mockAuthService = {
  // Check if user exists (by email or username)
  userExists: (emailOrUsername: string): boolean => {
    return mockUsers.some(
      (user) =>
        user.email.toLowerCase() === emailOrUsername.toLowerCase() ||
        user.username.toLowerCase() === emailOrUsername.toLowerCase()
    );
  },

  // Register a new user (returns 2FA code)
  signup: (
    email: string,
    username: string,
    password: string,
    phoneNumber: string
  ): { success: boolean; message: string; code?: string } => {
    // Check if user already exists
    if (mockAuthService.userExists(email) || mockAuthService.userExists(username)) {
      return {
        success: false,
        message: 'User with this email or username already exists',
      };
    }

    // Generate 2FA code
    const code = generateCode();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store the code
    twoFactorCodes.push({ email, code, expiresAt });

    // Log the code for testing purposes (in production, this would be sent via SMS)
    console.log(`🔐 2FA Code for ${email}: ${code}`);
    console.log(`📱 Code sent to phone: ${phoneNumber}`);

    // Create pending user (will be added after 2FA verification)
    const pendingUser: User = {
      id: (mockUsers.length + 1).toString(),
      email,
      username,
      password,
      phoneNumber,
      isVerified: false,
    };

    // Store in session storage temporarily
    sessionStorage.setItem('pendingUser', JSON.stringify(pendingUser));

    return {
      success: true,
      message: 'Verification code sent to your phone',
      code, // Return code for testing (remove in production)
    };
  },

  // Verify 2FA code for signup
  verifySignupCode: (email: string, code: string): { success: boolean; message: string } => {
    // Find the code
    const codeIndex = twoFactorCodes.findIndex(
      (tc) => tc.email === email && tc.code === code
    );

    if (codeIndex === -1) {
      return { success: false, message: 'Invalid verification code' };
    }

    const storedCode = twoFactorCodes[codeIndex];

    // Check if expired
    if (Date.now() > storedCode.expiresAt) {
      twoFactorCodes.splice(codeIndex, 1);
      return { success: false, message: 'Verification code expired' };
    }

    // Get pending user and add to database
    const pendingUserJson = sessionStorage.getItem('pendingUser');
    if (pendingUserJson) {
      const pendingUser = JSON.parse(pendingUserJson) as User;
      pendingUser.isVerified = true;
      mockUsers.push(pendingUser);
      sessionStorage.removeItem('pendingUser');

      console.log('User registered successfully:', pendingUser.email);
    }

    // Remove used code
    twoFactorCodes.splice(codeIndex, 1);

    return { success: true, message: 'Account verified successfully' };
  },

  // Login user (returns 2FA code)
  login: (
    emailOrUsername: string,
    password: string
  ): { success: boolean; message: string; code?: string; user?: User } => {
    const user = mockUsers.find(
      (u) =>
        (u.email.toLowerCase() === emailOrUsername.toLowerCase() ||
          u.username.toLowerCase() === emailOrUsername.toLowerCase()) &&
        u.password === password
    );

    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    if (!user.isVerified) {
      return { success: false, message: 'Account not verified' };
    }

    // Generate 2FA code for login
    const code = generateCode();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    twoFactorCodes.push({ email: user.email, code, expiresAt });

    console.log(`2FA Login Code for ${user.email}: ${code}`);
    console.log(`Code sent to phone: ${user.phoneNumber}`);

    return {
      success: true,
      message: 'Verification code sent to your phone',
      code, // Return code for testing (remove in production)
      user,
    };
  },

  // Verify 2FA code for login
  verifyLoginCode: (email: string, code: string): { success: boolean; message: string } => {
    const codeIndex = twoFactorCodes.findIndex(
      (tc) => tc.email === email && tc.code === code
    );

    if (codeIndex === -1) {
      return { success: false, message: 'Invalid verification code' };
    }

    const storedCode = twoFactorCodes[codeIndex];

    if (Date.now() > storedCode.expiresAt) {
      twoFactorCodes.splice(codeIndex, 1);
      return { success: false, message: 'Verification code expired' };
    }

    // Remove used code
    twoFactorCodes.splice(codeIndex, 1);

    console.log('Login successful for:', email);

    return { success: true, message: 'Login successful' };
  },

  // Resend 2FA code
  resendCode: (email: string): { success: boolean; message: string; code?: string } => {
    // Remove old code if exists
    const oldCodeIndex = twoFactorCodes.findIndex((tc) => tc.email === email);
    if (oldCodeIndex !== -1) {
      twoFactorCodes.splice(oldCodeIndex, 1);
    }

    // Generate new code
    const code = generateCode();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    twoFactorCodes.push({ email, code, expiresAt });

    console.log(`New 2FA Code for ${email}: ${code}`);

    return {
      success: true,
      message: 'New verification code sent',
      code, // Return code for testing
    };
  },

  // Get all users (for debugging)
  getAllUsers: (): User[] => {
    return mockUsers;
  },
};

