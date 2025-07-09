import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD_KkAKus3MKasymrqrDDrSs09ExpxM7do",
    authDomain: "realtime-chat-99d17.firebaseapp.com",
    projectId: "realtime-chat-99d17",
    storageBucket: "realtime-chat-99d17.appspot.com",
    messagingSenderId: "113404650525",
    appId: "1:113404650525:web:3551e1518d98eeb31a92f4"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);