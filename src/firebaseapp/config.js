import { initializeApp } from "firebase/app";

const firebaseConfig = {
  databaseURL:
    "https://courso-8070a-default-rtdb.asia-southeast1.firebasedatabase.app",
  apiKey: "AIzaSyBk9X5oHQORxzTiz8zafo1kIilA3099ukM",
  authDomain: "REACT_APP_-grid-dash-cd0da.firebaseapp.com",

  projectId: "REACT_APP_-grid-dash-cd0da",
  storageBucket: "REACT_APP_-grid-dash-cd0da.appspot.com",
  messagingSenderId: "973885828092",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(app.options);
