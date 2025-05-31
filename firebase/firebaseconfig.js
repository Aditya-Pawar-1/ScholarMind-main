import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB_ye6YN5lNpmJCy2NsG_4l_g3P4XEcq98",
  authDomain: "scholarmind-440d2.firebaseapp.com",
  projectId: "scholarmind-440d2",
  storageBucket: "scholarmind-440d2.firebasestorage.app",
  messagingSenderId: "134695995465",
  appId: "1:134695995465:web:a2bc764c473ca2a8b71798",
  measurementId: "G-0MTNHLVLX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Analytics (only works in browser environment)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { auth, onAuthStateChanged };
