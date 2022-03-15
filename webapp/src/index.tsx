import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./utils/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

ReactDOM.render(
  <React.StrictMode>

          <App />


  </React.StrictMode>,
  document.getElementById("root")
);



const functions = getFunctions();
const computeCartAndShipping = httpsCallable(functions, 'computeCartAndShipping');
computeCartAndShipping({
    items:[
            {product: {
                    id: "1",
                    img: "non",
                    price: 0.6,
                    title: "FFP2 mask"
                },
            amount: 3},

            {product: {
                id: "2",
                img: "non",
                price: 0.15,
                title: "Quirurgical mask"
            },
            amount: 3}
    ],
    user:"pablo@garciafernandez.eu",
    address:"Cassa de Pablo"
})
    .then((result ) => {
        const data = result.data;
        // @ts-ignore
        console.log(data.message);
    }).catch((error)=>{

        console.log(error.message);

    });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
