// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
signInWithPopup,
GoogleAuthProvider,
}
 from "firebase/auth";


//  database
import { 
    doc, setDoc,
    onSnapshot,
    addDoc,
    collection,
    deleteDoc,
   updateDoc,
   where,
   getDocs,
   query,
     serverTimestamp
 } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD52QhUuXT6WVb9yCb77mVJBbzkPzF5Rt4",
  authDomain: "expenses-tracker-370c7.firebaseapp.com",
  projectId: "expenses-tracker-370c7",
  storageBucket: "expenses-tracker-370c7.firebasestorage.app",
  messagingSenderId: "927437310718",
  appId: "1:927437310718:web:a2d51d7552a15451c4f3af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth  = getAuth(app)
const db = getFirestore(app);


export{
auth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
signInWithPopup,
GoogleAuthProvider,
db,
doc, 
setDoc,
onSnapshot,
addDoc,

 collection,
deleteDoc,
where,
getDocs,
query,
 updateDoc,
onAuthStateChanged,
 serverTimestamp
}