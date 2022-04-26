import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./utils/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>

        <PayPalScriptProvider
            options={{
                "client-id": "AasWxFdPNztdDfhqG6ksUNov6Ijfrnj6BX76NJ0RQhEVZiR9f2pgvBLiL3h56BUE3Ti75EWNInW07thm",
                currency: "USD",
            }}
        >
                <App />

        </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
