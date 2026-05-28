// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIWBKChFhN6-JHReS8T_XXwXjHRmP83UY",
  authDomain: "financely-rec-ec474.firebaseapp.com",
  projectId: "financely-rec-ec474",
  storageBucket: "financely-rec-ec474.firebasestorage.app",
  messagingSenderId: "218119960822",
  appId: "1:218119960822:web:36ca0b3e068f99cc7294d7",
  measurementId: "G-KPDJMTTHBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db,auth, provider,doc,setDoc};