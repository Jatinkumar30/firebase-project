import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCy5XPix2TQQ36Hj-a3ZBpcDkVVB5ihnzA",
  authDomain: "fir-project-d5790.firebaseapp.com",
  projectId: "fir-project-d5790",
  storageBucket: "fir-project-d5790.appspot.com",
  messagingSenderId: "101181547954",
  appId: "1:101181547954:web:97530749087defcffbb0ab",
  measurementId: "G-N73F651BMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);