// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "fp-taskmanager.firebaseapp.com",
  projectId: "fp-taskmanager",
  storageBucket: "fp-taskmanager.appspot.com",
  messagingSenderId: "76434804946",
  appId: "1:76434804946:web:cd0d5b905bb053758d9d0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);