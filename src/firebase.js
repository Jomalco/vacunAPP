// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMhoRBhcyZWtzFGaftbz-Rf4kMNabk5AQ",
  authDomain: "vacunapp-2023.firebaseapp.com",
  projectId: "vacunapp-2023",
  storageBucket: "vacunapp-2023.appspot.com",
  messagingSenderId: "203244012911",
  appId: "1:203244012911:web:d4c0d9f1ef325b1d53d49a",
  measurementId: "G-WWLZYYHESB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;