import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import EmailForm from "./components/EmailForm";
import Welcome from "./components/Welcome";
import UserList from "./components/UserList";
import { getUsers } from "./api/api";
import { User } from "./api/model/user";
import "./App.scss";
import "./Styles.scss";
import MainPage from "./components/pages/mainPage/MainPage";
import TopMenu from "./components/menu/TopMenu";

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
      <TopMenu></TopMenu>
      <MainPage></MainPage>
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
