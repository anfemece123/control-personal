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
  apiKey: "AIzaSyCoE_YDZe7bwkfDBWpjQl6Fw48gNS3FyXk",
  authDomain: "prueba-tecnica-newrona.firebaseapp.com",
  projectId: "prueba-tecnica-newrona",
  storageBucket: "prueba-tecnica-newrona.appspot.com",
  messagingSenderId: "213398281782",
  appId: "1:213398281782:web:42f4d27697953f8d478297",
  measurementId: "G-PZ4B352NNM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const analytics = getAnalytics(app);

export const db = getFirestore();
