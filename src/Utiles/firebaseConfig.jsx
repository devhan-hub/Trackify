import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyB8gMvhpsFxgSr1qcK-uMCW0IGGv-8gobw",
  authDomain: "todo-61d84.firebaseapp.com",
  projectId: "todo-61d84",
  storageBucket: "todo-61d84.firebasestorage.app",
  messagingSenderId: "222681188800",
  appId: "1:222681188800:web:27cfc79028b49598be6025"
};


const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const  auth = getAuth(app)

export {db , auth};