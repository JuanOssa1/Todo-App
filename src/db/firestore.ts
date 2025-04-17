// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpknZSSDC4rfFqC7XKMdENnMdPEZgFA68",
  authDomain: "taskmanagement-d5648.firebaseapp.com",
  projectId: "taskmanagement-d5648",
  storageBucket: "taskmanagement-d5648.firebasestorage.app",
  messagingSenderId: "932202272406",
  appId: "1:932202272406:web:63506c92d4b04c7dd4d4b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
