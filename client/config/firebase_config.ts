// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiXpK0UMunTJiM8ZvaPutS-l9yOgieWiQ",
  authDomain: "foodframe-422304.firebaseapp.com",
  projectId: "foodframe-422304",
  storageBucket: "foodframe-422304.appspot.com",
  messagingSenderId: "121525382197",
  appId: "1:121525382197:web:f5a5a391a9a9236668957c",
  measurementId: "G-FHLHG5N0HW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Initialize and export Firestore
export const storage = getStorage(app);

