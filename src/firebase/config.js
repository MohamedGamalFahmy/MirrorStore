import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWum1_5dPjYWBwnZbC9kB-tKVewTFDe7g",
  authDomain: "gf-for-glass.firebaseapp.com",
  projectId: "gf-for-glass",
  storageBucket: "gf-for-glass.firebasestorage.app",
  messagingSenderId: "714816416006",
  appId: "1:714816416006:web:d9557d11c021d76a06d687"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
export const db = getFirestore(app);
export const auth = getAuth(app);