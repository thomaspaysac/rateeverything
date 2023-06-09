// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhdZqBHmNKm87MiwzBJIl1PG8NInGQZ8k",
  authDomain: "rym-clone.firebaseapp.com",
  projectId: "rym-clone",
  storageBucket: "rym-clone.appspot.com",
  messagingSenderId: "480078681930",
  appId: "1:480078681930:web:59e641e5c9dc1dd87ed3b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { firebaseConfig, app };