// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbVDj8_J9RGKHizjnSgQtcI7pSLbawVRE",
  authDomain: "dinespace-79104.firebaseapp.com",
  projectId: "dinespace-79104",
  storageBucket: "dinespace-79104.firebasestorage.app",
  messagingSenderId: "861437992056",
  appId: "1:861437992056:web:102951a5c62fc1ed62218d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
