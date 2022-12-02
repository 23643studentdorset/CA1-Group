// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArE-Ps3lUoXkW7haKmKjjFuPQLcEjpqpM",
  authDomain: "ca1-group-2472e.firebaseapp.com",
  projectId: "ca1-group-2472e",
  storageBucket: "ca1-group-2472e.appspot.com",
  messagingSenderId: "606756605796",
  appId: "1:606756605796:web:7f72dfc06955ec2cf03471"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db =getFirestore(app);
export {auth, db};