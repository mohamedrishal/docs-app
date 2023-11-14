import { initializeApp } from "firebase/app";
import {getAuth}  from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB_VWA2feyKcW6rptRa7uAzZ26RKY3Qtpg",
  authDomain: "docs-data-e09df.firebaseapp.com",
  projectId: "docs-data-e09df",
  storageBucket: "docs-data-e09df.appspot.com",
  messagingSenderId: "99638757247",
  appId: "1:99638757247:web:f22a3b87657c22251a3c4a",
  measurementId: "G-M8TJF06JBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
