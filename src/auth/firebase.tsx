import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCkHLQcnzauoF6o_zo2FFoKnRd1E5_8uuo",
    authDomain: "moneymanager-87778.firebaseapp.com",
    projectId: "moneymanager-87778",
    storageBucket: "moneymanager-87778.appspot.com",
    messagingSenderId: "480093011364",
    appId: "1:480093011364:web:67c99f7f4df548456b1531"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;