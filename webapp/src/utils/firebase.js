"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.functions = exports.auth = void 0;
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var auth_1 = require("firebase/auth");
var functions_1 = require("firebase/functions");
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
var firebaseConfig = {
    apiKey: "AIzaSyAsJIeaL0YAdv0QJG7CuXuR26grYco5-p0",
    authDomain: "dede-en3a.firebaseapp.com",
    projectId: "dede-en3a",
    storageBucket: "dede-en3a.appspot.com",
    messagingSenderId: "344724226999",
    appId: "1:344724226999:web:1aef51b515c7983e08de32",
    measurementId: "G-Q99W98RL24"
};
console.log(firebaseConfig);
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.auth = (0, auth_1.getAuth)(app);
exports.functions = (0, functions_1.getFunctions)(app);
exports.db = (0, firestore_1.getFirestore)(app);
