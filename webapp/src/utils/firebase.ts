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
  apiKey: "AIzaSyAsJIeaL0YAdv0QJG7CuXuR26grYco5-p0",
  authDomain: "dede-en3a.firebaseapp.com",
  projectId: "dede-en3a",
  storageBucket: "dede-en3a.appspot.com",
  messagingSenderId: "344724226999",
  appId: "1:344724226999:web:1aef51b515c7983e08de32",
  measurementId: "G-Q99W98RL24",
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const functions = getFunctions(app);

export const db = getFirestore(app);
