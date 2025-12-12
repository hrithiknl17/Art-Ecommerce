// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// REPLACE THIS WITH YOUR ACTUAL FIREBASE CONFIG FROM THE CONSOLE
const firebaseConfig = {
    apiKey: "AIzaSyDdwW2d6MdPGmtWkoi-3rh4eyyz3nfP78M",
  authDomain: "ecommerce-5ba63.firebaseapp.com",
  projectId: "ecommerce-5ba63",
  storageBucket: "ecommerce-5ba63.firebasestorage.app",
  messagingSenderId: "861528331208",
  appId: "1:861528331208:web:8a30fd1ce9c47853d9e6fd",
  measurementId: "G-KKPEM2N0YE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);