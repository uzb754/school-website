import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBERIFLd9yMyJHU3mDl5UGC2hr5hMjDXig",
  authDomain: "maktab-269.firebaseapp.com",
  databaseURL: "https://maktab-269-default-rtdb.firebaseio.com",
  projectId: "maktab-269",
  storageBucket: "maktab-269.firebasestorage.app",
  messagingSenderId: "246317372987",
  appId: "1:246317372987:web:993d778f63f9696ee66e1e",
  measurementId: "G-FLK01YK4LF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);