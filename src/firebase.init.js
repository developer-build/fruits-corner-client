// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB-kwpRq1SBY6S_6ZGpuwm18VmQU4d1DeM",
//   authDomain: "fruits-corner-893ac.firebaseapp.com",
//   projectId: "fruits-corner-893ac",
//   storageBucket: "fruits-corner-893ac.appspot.com",
//   messagingSenderId: "730260011552",
//   appId: "1:730260011552:web:c8fc86e3760115fd4c1a45"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;