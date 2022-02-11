// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

export const db = getFirestore(app);