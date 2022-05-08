// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCLXpcpLKymb9Wb8ALARhKamCp3J64138",
  authDomain: "expense-manager-da647.firebaseapp.com",
  projectId: "expense-manager-da647",
  storageBucket: "expense-manager-da647.appspot.com",
  messagingSenderId: "718782916987",
  appId: "1:718782916987:web:2003cb29044bee084335de",
  measurementId: "G-DBJ6YVDN62"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firestore  = getFirestore(app);
