import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';
// Initialize Firebase Admin SDK
const initializeFirebase = () => {
    // Return existing app if already initialized
    if (admin.apps.length > 0) {
        return admin.app();
    }
    try {
        // Path to the service account key file
        const serviceAccountPath = path.join(__dirname, '../../config/firebase-service-account.json');
        if (!fs.existsSync(serviceAccountPath)) {
            throw new Error('Firebase service account key file not found');
        }
        const app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccountPath),
            databaseURL: process.env.FIREBASE_DATABASE_URL,
        });
        console.log('Firebase Admin initialized successfully');
        return app;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to initialize Firebase Admin:', errorMessage);
        // In production, we want to fail fast if Firebase can't be initialized
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
        throw new Error(`Firebase initialization failed: ${errorMessage}`);
    }
};
// Initialize Firebase
const firebaseApp = initializeFirebase();
// Export initialized services
export const auth = admin.auth(firebaseApp);
export const db = admin.firestore(firebaseApp);
// Export the Firebase app instance
export const getFirebaseApp = () => firebaseApp;
export default firebaseApp;
