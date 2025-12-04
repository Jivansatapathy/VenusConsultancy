// client/src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEHj4YTsEt07P8OXJm3MVu4JMhozblVHI",
  authDomain: "venusglobal-847ea.firebaseapp.com",
  projectId: "venusglobal-847ea",
  storageBucket: "venusglobal-847ea.firebasestorage.app",
  messagingSenderId: "841304788329",
  appId: "1:841304788329:web:726fb2353a1135b48b01f8",
  measurementId: "G-MWE9SLRQKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { storage, db, analytics };
export default app;

