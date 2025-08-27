// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNxvQA-82MgxXAzkLRabadKt9I61FMRe8",
    authDomain: "parvathavardhini2025.firebaseapp.com",
    projectId: "parvathavardhini2025",
    storageBucket: "parvathavardhini2025.appspot.com",
    messagingSenderId: "902451328910",
    appId: "1:902451328910:web:b7afd9a70cdace298396df",
    measurementId: "G-QWCEJSLQF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you need for other files to use
export const auth = getAuth(app);
export const db = getFirestore(app);