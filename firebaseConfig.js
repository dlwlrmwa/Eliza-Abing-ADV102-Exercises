import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDy5g3nDKIL7KFSLXizZThK6BJC7tOuKU0",
    authDomain: "adv102-abing.firebaseapp.com",
    projectId: "adv102-abing",
    storageBucket: "adv102-abing.appspot.com",
    messagingSenderId: "172193251499",
    appId: "1:172193251499:web:ceb802abfc6bc9868077ee",
    measurementId: "G-SXS1EBSSF6"
};

// Check if Firebase app is already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const storage = getStorage(app);