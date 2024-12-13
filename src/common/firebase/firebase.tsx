// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { getAuth, onAuthStateChanged} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuFDRfn6pQ3bDXwUU_5xV3H8F7QU2JDuM",
  authDomain: "social-media-dc29a.firebaseapp.com",
  projectId: "social-media-dc29a",
  storageBucket: "social-media-dc29a.firebasestorage.app",
  messagingSenderId: "230795766921",
  appId: "1:230795766921:web:ed1379af03e6137faaaa58",
  measurementId: "G-3F73XY5JXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db, onAuthStateChanged};