import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwtGjZLBTecCK4I4udMlnu6lMBn1fJ1Bk",
  authDomain: "eaglemath-e1862.firebaseapp.com",
  projectId: "eaglemath-e1862",
  storageBucket: "eaglemath-e1862.firebasestorage.app",
  messagingSenderId: "629299724964",
  appId: "1:629299724964:web:8022c0306ec8ba7595dc31",
  measurementId: "G-F1ESNEGY2Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable Offline Persistence for instant loading
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time.
      console.warn('Firestore persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the features required to enable persistence
      console.warn('Firestore persistence failed: Browser not supported');
    }
  });
} catch (e) {
  console.error("Persistence error", e);
}

export default app;
