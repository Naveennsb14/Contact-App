// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB1FgER-m2kfGGom8VK48XL2OADngCfVA",
  authDomain: "vite-contact-7ec0d.firebaseapp.com",
  projectId: "vite-contact-7ec0d",
  storageBucket: "vite-contact-7ec0d.appspot.com",
  messagingSenderId: "969501906566",
  appId: "1:969501906566:web:49159a7f78a987f80a2307"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
