import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiFROKu9z1duzJ_4L8n5ZNDqvqUKqfzW0",
  authDomain: "complexivomoviles-6209e.firebaseapp.com",
  databaseURL: "https://complexivomoviles-6209e-default-rtdb.firebaseio.com",
  projectId: "complexivomoviles-6209e",
  storageBucket: "complexivomoviles-6209e.firebasestorage.app",
  messagingSenderId: "475758680186",
  appId: "1:475758680186:web:6b56e0b7e31eba4dbb43c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
