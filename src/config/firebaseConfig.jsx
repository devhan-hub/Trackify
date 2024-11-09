import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCM99bhMkWQyOCcGJiOHFTnVctdLXleOFU",
  authDomain: "to-do-app-86dff.firebaseapp.com",
  projectId: "to-do-app-86dff",
  storageBucket: "to-do-app-86dff.firebasestorage.app",
  messagingSenderId: "785221957273",
  appId: "1:785221957273:web:5295dcf368bd9a0262ea08"
};


const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const  auth = getAuth(app)

export {db , auth};