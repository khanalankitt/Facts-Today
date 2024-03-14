import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDdfXDoyJVpSRRi-vhbXtx0WV_lqomT5Zc",
  authDomain: "facts-today-e7fc3.firebaseapp.com",
  projectId: "facts-today-e7fc3",
  storageBucket: "facts-today-e7fc3.appspot.com",
  messagingSenderId: "80172550906",
  appId: "1:80172550906:web:078efa20f745a8f7dd9743",
  measurementId: "G-7JE4N3HDGT"
};

const app = initializeApp(firebaseConfig);
const img = getStorage(app);
const text = getFirestore(app);
export let dbimg = img;
export let dbtext = text;
