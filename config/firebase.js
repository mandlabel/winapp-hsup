import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCmYqAbJiqj-sYw-wFm4So0hVnfNBAJdJk",
    authDomain: "winapp-43dba.firebaseapp.com",
    projectId: "winapp-43dba",
    storageBucket: "winapp-43dba.appspot.com",
    messagingSenderId: "492735491263",
    appId: "1:492735491263:web:d49968c6f0a65cce76ea0a",
    measurementId: "G-GF1PNMVZTP"
};

initializeApp(firebaseConfig);
export const db = getFirestore();