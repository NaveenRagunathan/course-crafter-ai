import { auth as firebaseAuth } from 'firebase-admin';
import { auth as firebaseAdmin, getFirebaseApp } from '../config/firebase.js';
import { Router } from 'express';
import authRoutes from '../routes/auth.js';

/**
 * Initialize Firebase Admin and set up authentication routes
 * @returns Express Router with authentication routes
 */
export const initializeFirebaseAuth = (): Router => {
  // Use getFirebaseApp to check initialization
  if (!getFirebaseApp()) {
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
  // Use getFirebaseApp to check initialization
  if (!getFirebaseApp()) {
    throw new Error('Firebase Admin SDK not initialized');
  }
  return firebaseAdmin;
};

const firebaseUtils = {
  initializeFirebaseAuth,
  getAuth,
};

export default firebaseUtils;
