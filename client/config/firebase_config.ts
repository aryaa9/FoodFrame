// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export const storage = getStorage(app);
