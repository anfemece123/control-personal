// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Fi  rebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFn7ETi3_Sb0fTRhLhaI1639lT80kfwAI",
  authDomain: "pruebatecnicanewrona.firebaseapp.com",
  projectId: "pruebatecnicanewrona",
  storageBucket: "pruebatecnicanewrona.appspot.com",
  messagingSenderId: "44538133204",
  appId: "1:44538133204:web:f52b82d86e216f334d1941",
  measurementId: "G-MY13LC8MSD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const analytics = getAnalytics(app);

export const db = getFirestore();
