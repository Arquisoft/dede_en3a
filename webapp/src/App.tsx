import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import EmailForm from "./components/EmailForm";
import Welcome from "./components/Welcome";
import UserList from "./components/UserList";
import { getUsers } from "./api/api";
import { User } from "./api/model/user";
import Navbar from './components/navBar/Navbar';
import "./App.scss";

import {Routes,Route} from 'react-router-dom';
import {Home} from './components/login/home'
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
        <div className={"bg-slate-300 h-screen text-white flex"}>
          <Routes>

            <Route path = "/" element={<Home/>}></Route>
            <Route path = "/login" element={<Login/>}></Route>
            <Route path = "/home" element={<Register/>}></Route>

          </Routes>
        </div>
  );



  /*return (
    <>
      <Navbar></Navbar>
      <Container maxWidth="sm">

        <Welcome message="ASW students" />
        <Box component="div" sx={{ py: 2 }}>
          This is a basic example of a React application using Typescript. You
          can add your email to the list filling the form below.
        </Box>
        <EmailForm OnUserListChange={refreshUserList} />
        <UserList users={users} />
        <Link href="https://github.com/pglez82/asw2122_0">Source code</Link>
      </Container>
    </>
  );*/
}

export default App;
