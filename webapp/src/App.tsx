import React, { useState, useEffect } from "react";


import { getUsers } from "./api/api";
import { User } from "./api/model/user";
import "./App.scss";
import "./Styles.scss";
import MainPage from "./components/pages/mainPage/MainPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./components/CartItem/CartItem";
import LoginPage from "./components/pages/LoginPage/LoginPage";

import {Dashboard} from './components/pages/DashboardPage/dashboard'
import {RegisterPage} from "./components/pages/RegisterPage/RegisterPage";
import {getFunctions, httpsCallable} from "firebase/functions";

function App(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  };

  useEffect(() => {
    refreshUserList();
  }, []);



  const functions = getFunctions();
  const sendOrder = httpsCallable(functions, 'sendOrder');
    sendOrder({
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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/cart" element={<Cart products={[]} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path={"/dashboard"} element={<Dashboard/>}/>;
        </Routes>
      </BrowserRouter>
      {/* <Welcome message="ASW students" />
        <Box component="div" sx={{ py: 2 }}>
          This is a basic example of a React application using Typescript. You
          can add your email to the list filling the form below.
        </Box>
        <EmailForm OnUserListChange={refreshUserList} />
        <UserList users={users} />
        <Link href="https://github.com/pglez82/asw2122_0">Source code</Link> */}
    </>
  );
}

export default App;
