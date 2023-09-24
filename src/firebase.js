// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3BzuWxTPL0gyhYZQF0vzcIhbGwD5F_OY",
    authDomain: "theoffensiveline-d8493.firebaseapp.com",
    projectId: "theoffensiveline-d8493",
    storageBucket: "theoffensiveline-d8493.appspot.com",
    messagingSenderId: "991591330610",
    appId: "1:991591330610:web:6bd5820bae6ed43e609d2b",
    measurementId: "G-SPPLESW7M0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export const auth = app.firebase.auth();
export const db = getFirestore(app);