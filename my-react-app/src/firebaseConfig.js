// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (apiKey, projectId, etc.)
const firebaseConfig = {
  apiKey: "AIzaSyBGvGQywIFo_FzAWMGqOkpBkUeg9s02MUE",
  authDomain: "dosis-obat-medis.firebaseapp.com",
  projectId: "dosis-obat-medis",
  storageBucket: "dosis-obat-medis.firebasestorage.app",
  messagingSenderId: "452927541657",
  appId: "1:452927541657:web:74a2b0565d7d11c5a74308",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// Export everything properly
export { app, auth, db };