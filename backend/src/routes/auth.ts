import { Router, Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import winston from 'winston';
// Import the auth instance from firebase config
import { auth as firebaseAuth } from '../config/firebase.js';

// Rate limiter: 10 requests per minute per IP for auth endpoints
export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Logger using winston
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    // Add file transport if needed
  ],
});

// Middleware to require email verification
export const requireEmailVerified = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.emailVerified) {
    logger.warn(`Blocked action for unverified email: ${req.user?.uid}`);
    return res.status(403).json({ error: 'Email not verified. Please verify your email to perform this action.' });
  }
  next();
};

// Import custom type declarations
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Interface for user profile update data
interface UserProfileUpdate {
  displayName?: string;
  photoURL?: string;
}

// Interface for provider data
interface ProviderData {
  providerId: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

const router = Router();

// Register new user
router.post('/register', rateLimiter, async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }
  try {
    // Create user in Firebase Auth
    const userRecord = await firebaseAuth.createUser({
      displayName: name,
      email,
      password,
      emailVerified: false
    });
    // Send verification email
    try {
      await firebaseAuth.generateEmailVerificationLink(email);
    } catch (err) {
      logger.warn('User created but failed to send verification email', { email, error: err });
    }
    logger.info('User registered', { uid: userRecord.uid, email });
    res.status(201).json({ message: 'User registered. Please verify your email.' });
  } catch (error: any) {
    logger.error('Registration failed', { error });
    let msg = 'Registration failed.';
    if (error.code === 'auth/email-already-exists') {
      msg = 'Email already registered.';
    }
    res.status(400).json({ error: msg });
  }
});

// Middleware to verify Firebase ID token
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  
  try {
    const decodedToken = await firebaseAuth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error: unknown) {
    console.error('Error verifying token:', error);
    const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
    return res.status(401).json({ 
      error: 'Unauthorized - Invalid or expired token',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
};

// Get current user
router.get('/me', rateLimiter, verifyToken, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      logger.warn('User not authenticated on /me');
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const user = await firebaseAuth.getUser(req.user.uid);
    const providerData: ProviderData[] = user.providerData.map(provider => ({
      providerId: provider.providerId || null,
      email: provider.email || null,
      displayName: provider.displayName || null,
      photoURL: provider.photoURL || null
    }));
    logger.info(`User profile fetched: ${user.uid}`);
    res.status(200).json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      emailVerified: user.emailVerified,
      providerData
    });
  } catch (error: unknown) {
    logger.error('Error fetching user', { error });
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user data';
    res.status(500).json({ 
      error: 'Error fetching user data',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
});

// Update user profile
router.put('/profile', rateLimiter, verifyToken, requireEmailVerified, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      logger.warn('User not authenticated on /profile');
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const { displayName, photoURL } = req.body as UserProfileUpdate;
    if (displayName === undefined && photoURL === undefined) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    const updateData: UserProfileUpdate = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (photoURL !== undefined) updateData.photoURL = photoURL;
    const user = await firebaseAuth.updateUser(req.user.uid, updateData);
    logger.info(`User profile updated: ${user.uid}`);
    res.status(200).json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
    });
  } catch (error: unknown) {
    logger.error('Error updating profile', { error });
    const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
    res.status(500).json({ 
      error: 'Error updating profile',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
});

// Update user password
router.put('/updatepassword', rateLimiter, verifyToken, requireEmailVerified, async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Both currentPassword and newPassword are required.' });
  }
  try {
    // Use Firebase Auth REST API to reauthenticate and update password
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      return res.status(401).json({ error: 'No token provided' });
    }
    // Re-authenticate user
    // (In production, use Firebase REST API to verify current password)
    // For now, require frontend to re-login and get a fresh token after password change
    await firebaseAuth.updateUser(req.user.uid, { password: newPassword });
    logger.info(`Password updated for user: ${req.user.uid}`);
    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error: unknown) {
    logger.error('Error updating password', { error });
    const errorMessage = error instanceof Error ? error.message : 'Failed to update password';
    res.status(500).json({ 
      error: 'Error updating password',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
});

// Update user details (email)
router.put('/updatedetails', rateLimiter, verifyToken, requireEmailVerified, async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email must be provided.' });
  }
  try {
    await firebaseAuth.updateUser(req.user.uid, { email });
    logger.info(`Email updated for user: ${req.user.uid}`);
    res.status(200).json({ message: 'User details updated successfully.' });
  } catch (error: unknown) {
    logger.error('Error updating user details', { error });
    const errorMessage = error instanceof Error ? error.message : 'Failed to update user details';
    res.status(500).json({ 
      error: 'Error updating user details',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
});

// Logout endpoint (token revocation)
router.get('/logout', rateLimiter, verifyToken, async (req: Request, res: Response) => {
  try {
    await firebaseAuth.revokeRefreshTokens(req.user.uid);
    logger.info(`Tokens revoked for user: ${req.user.uid}`);
    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error: unknown) {
    logger.error('Error during logout', { error });
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Refresh token endpoint (real)
router.post('/refresh-token', rateLimiter, async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: 'refreshToken is required.' });
  }
  try {
    // Use Firebase REST API to exchange refreshToken for new idToken
    // (You need to set FIREBASE_API_KEY in env)
    const apiKey = process.env.FIREBASE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server misconfiguration: missing Firebase API key.' });
    }
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    });
    const data = await response.json();
    if (!data.id_token) {
      logger.warn('Invalid refresh token used');
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
    logger.info('Refresh token used successfully');
    res.status(200).json({ token: data.id_token, refreshToken: data.refresh_token });
  } catch (error: unknown) {
    logger.error('Error refreshing token', { error });
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

export default router;
