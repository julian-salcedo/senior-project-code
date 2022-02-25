// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAUeAZUWbifBrhg6qaIBkB27xCADDP4Hyk",
  authDomain: "senior-project-d4c37.firebaseapp.com",
  projectId: "senior-project-d4c37",
  storageBucket: "senior-project-d4c37.appspot.com",
  messagingSenderId: "685584647328",
  appId: "1:685584647328:web:d76f9c24cb8ca28472b5c5",
  measurementId: "G-J0DS6V5T93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};