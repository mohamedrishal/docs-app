import { initializeApp } from "firebase/app";
import {getAuth}  from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCf2Jvn9VWnRw1bMoDcdgE0IjzqNTv_p80",
  authDomain: "docsapp-65ae4.firebaseapp.com",
  projectId: "docsapp-65ae4",
  storageBucket: "docsapp-65ae4.appspot.com",
  messagingSenderId: "278778444383",
  appId: "1:278778444383:web:296b1d8c84a49783d739ea",
  measurementId: "G-55WPLXCSG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
