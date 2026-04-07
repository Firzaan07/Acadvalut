const admin = require('firebase-admin');

/**
 * Initialize Firebase Admin SDK using Application Default Credentials.
 * In development, we initialize with just the project ID — no service account
 * key file needed since we only use it to verify ID tokens.
 */
let firebaseAdmin = null;

const initFirebaseAdmin = () => {
  if (firebaseAdmin) return firebaseAdmin; // Already initialized — return cached instance

  try {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
      console.log('✅ Firebase Admin SDK initialized (project:', process.env.FIREBASE_PROJECT_ID + ')');
    }
    firebaseAdmin = admin;
    return firebaseAdmin;
  } catch (error) {
    console.error('❌ Firebase Admin initialization failed:', error.message);
    throw error;
  }
};

/**
 * Verify a Firebase ID token and return the decoded token payload.
 * The token is issued by Firebase after Google Sign-In on the client.
 */
const verifyFirebaseToken = async (idToken) => {
  const adminApp = initFirebaseAdmin();
  try {
    const decoded = await adminApp.auth().verifyIdToken(idToken);
    return decoded;
  } catch (error) {
    console.error('Firebase token verification error:', error.code, error.message);
    throw new Error('Invalid or expired Firebase token. Please sign in again.');
  }
};

module.exports = { initFirebaseAdmin, verifyFirebaseToken };
