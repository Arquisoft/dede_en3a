import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   databaseURL: process.env.REACT_APP_databaseURL,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
// };

//TODO: Should be in enverioment variables for security
const firebaseConfig = {
  apiKey: "AIzaSyA2Av0CtLnSj70ctDj46diy7gy7z6VbXNc",
  authDomain: "dede-en3a-336f8.firebaseapp.com",
  projectId: "dede-en3a-336f8",
  storageBucket: "dede-en3a-336f8.appspot.com",
  messagingSenderId: "390589954853",
  appId: "1:390589954853:web:682d49a4be48add1db38cc",
  measurementId: "G-0MBW31WPG5",
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const functions = getFunctions(app, "europe-west1");

export const db = getFirestore(app);
