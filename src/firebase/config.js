import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDSXp4LHTUPMkG1TIOFZnULGwFzad-R3AY",
  authDomain: "adashibd.firebaseapp.com",
  projectId: "adashibd",
  storageBucket: "adashibd.firebasestorage.app",
  messagingSenderId: "231935843462",
  appId: "1:231935843462:web:76d89ff508604abea5c507"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 