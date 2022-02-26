import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MyLoginButton from './components/login-inrupt/my-login-button';
import GoogleLog from "./components/login-inrupt/googleLog";
import WithChildren from "./components/login-inrupt/inruptLogButton"




ReactDOM.render(
  <React.StrictMode>

    <GoogleLog  />
      <MyLoginButton/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
