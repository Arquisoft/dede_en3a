import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Link from "@mui/material/Link";
// import Container from "@mui/material/Container";
// //import EmailForm from "./components/EmailForm";
// import Welcome from "./components/Welcome";
// import UserList from "./components/UserList";
import { getUsers } from "./api/api";
import { User } from "./api/model/user";
//import Navbar from './components/navBar/Navbar';
import "./App.scss";

import {Routes,Route} from 'react-router-dom';
import {Dashboard} from './components/login/dashboard'
import {Login} from "./components/login/login";
import {Register} from "./components/login/register";
//import {AuthProvider} from "./context/AuthContext";

function App(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  };

  useEffect(() => {
    refreshUserList();
  }, []);



  return (
        <div className={"bg-slate-300 h-screen text-black flex"}>


                <Routes>

                    <Route path = "/" element={<Dashboard/>}></Route>
                    <Route path = "/login" element={<Login/>}></Route>
                    <Route path = "/dashboard" element={<Dashboard/>}></Route>
                    <Route path = "/register" element={<Register/>}></Route>

                </Routes>


        </div>
  );


}

export default App;
