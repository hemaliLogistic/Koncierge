// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBdzQN4lyXIyTaia08QOhmMlJFH60tgwFw",
  authDomain: "koncierge-57828.firebaseapp.com",
  databaseURL: "https://koncierge-57828-default-rtdb.firebaseio.com",
  projectId: "koncierge-57828",
  storageBucket: "koncierge-57828.firebasestorage.app",
  messagingSenderId: "716779991674",
  appId: "1:716779991674:web:fd6fd9361314580729c1c3",
  measurementId: "G-ELRPYFQTMZ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
