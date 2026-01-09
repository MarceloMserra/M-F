import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC8YA9o9KVlKW1j9Ps2gqwYYWJDnFt6Go4",
    authDomain: "casal2026-888ce.firebaseapp.com",
    databaseURL: "https://casal2026-888ce-default-rtdb.firebaseio.com",
    projectId: "casal2026-888ce",
    storageBucket: "casal2026-888ce.firebasestorage.app",
    messagingSenderId: "314398386836",
    appId: "1:314398386836:web:e401b22d85e7bbe5e9e281",
    measurementId: "G-RHXB26B178"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
