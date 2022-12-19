// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu8kjdpGfcqIPihVe2DJMQdLQrfVRuSYU",
  authDomain: "test-firebase-1bd84.firebaseapp.com",
  projectId: "test-firebase-1bd84",
  storageBucket: "test-firebase-1bd84.appspot.com",
  messagingSenderId: "634834338438",
  appId: "1:634834338438:web:46c25dbed551cdc538c707",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
