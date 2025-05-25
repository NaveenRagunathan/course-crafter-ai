import { auth as firebaseAuth } from 'firebase-admin';
import { auth as firebaseAdmin, getFirebaseApp } from '../config/firebase';
import { Router } from 'express';
import authRoutes from '../routes/auth';

/**
 * Initialize Firebase Admin and set up authentication routes
 * @returns Express Router with authentication routes
 */
export const initializeFirebaseAuth = (): Router => {
  if (!firebaseAdmin) {
    throw new Error('Firebase Admin SDK not initialized');
  }
  
  console.log('Firebase Auth initialized successfully');
  return authRoutes;
};

/**
 * Get the Firebase Admin Auth instance
 * @returns Firebase Admin Auth instance
 * @throws Error if Firebase Admin is not initialized
 */
export const getAuth = (): firebaseAuth.Auth => {
  if (!firebaseAdmin) {
    throw new Error('Firebase Admin SDK not initialized');
  }
  return firebaseAdmin;
};

export default {
  initializeFirebaseAuth,
  getAuth,
};
