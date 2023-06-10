
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBN13ltO4-TyR7z2YVfzlp0TzZH-S4UlUg",
  authDomain: "image-flower-store.firebaseapp.com",
  projectId: "image-flower-store",
  storageBucket: "image-flower-store.appspot.com",
  messagingSenderId: "688036932189",
  appId: "1:688036932189:web:cacc83339cdacae7c33bb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);