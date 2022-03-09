import React, { useState, useEffect } from "react";


import { getUsers } from "./api/api";
import { User } from "./api/model/user";
import "./App.scss";
import "./Styles.scss";
import MainPage from "./components/pages/mainPage/MainPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./components/CartItem/CartItem";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";

import {Dashboard} from './components/login/dashboard'
import {Login} from "./components/login/login";
import {Register} from "./components/login/register";

function App(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  };

  useEffect(() => {
    refreshUserList();
  }, []);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/cart" element={<Cart products={products} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/home" />} />
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
