import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAnPN8z1Q1vYHFoFFN9WYWpGMurPLnTouw",
  authDomain: "testing-cd094.firebaseapp.com",
  projectId: "testing-cd094",
  storageBucket: "testing-cd094.appspot.com",
  messagingSenderId: "438422617217",
  appId: "1:438422617217:web:f743f8c64c6a24ad1fe180",
  measurementId: "G-RHSP9KF0E4",
  databaseURl:'https://testing-cd094-default-rtdb.firebaseio.com'
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
