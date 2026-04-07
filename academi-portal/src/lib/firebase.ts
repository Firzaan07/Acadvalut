import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBs6f_P7IKzn6HNa49kWe4qgHyNRNA5izo",
  authDomain: "student-data-system-65f40.firebaseapp.com",
  projectId: "student-data-system-65f40",
  storageBucket: "student-data-system-65f40.firebasestorage.app",
  messagingSenderId: "584010217380",
  appId: "1:584010217380:web:0229d473fcea4de35ab331",
  measurementId: "G-RDL36V6RPG",
};

// Initialize Firebase only once (prevents duplicate app error on hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firebase Auth instance
export const auth = getAuth(app);

// Initialize Analytics only in browser environments that support it
export const initAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
