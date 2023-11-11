import { initializeApp } from "firebase/app";
import {getAuth}  from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB57H-rISPBgetlzahsiwwHWNJpPP1h-3M",
  authDomain: "docs-app-8d938.firebaseapp.com",
  projectId: "docs-app-8d938",
  storageBucket: "docs-app-8d938.appspot.com",
  messagingSenderId: "404943892378",
  appId: "1:404943892378:web:ff4b56a26c8eb9bdc79423",
  measurementId: "G-P1W3T1LK9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)