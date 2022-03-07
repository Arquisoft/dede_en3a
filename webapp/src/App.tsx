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
import Cart from "./components/Cart/Cart";
import {Routes,Route} from 'react-router-dom';

function App(): JSX.Element {

  const products = [
      {
        name: "Uno",
        img: "https://irecetasfaciles.com/wp-content/uploads/2019/08/pizza-de-jamon-queso-y-tocino.jpg",

      },
      {
        name: "Dos",
        img: "https://irecetasfaciles.com/wp-content/uploads/2019/08/pizza-de-jamon-queso-y-tocino.jpg",
      }
  ]

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
        <Routes>
            <Route path = "/" element={MainPage}></Route>

            <Route path = "/Cart" element={<Cart products={[
                {
                    name: "Uno",
                    img: "https://irecetasfaciles.com/wp-content/uploads/2019/08/pizza-de-jamon-queso-y-tocino.jpg",
                    title: "Uno"
                },
                {
                    name: "Dos",
                    img: "https://irecetasfaciles.com/wp-content/uploads/2019/08/pizza-de-jamon-queso-y-tocino.jpg",
                    title: "Dos"
                }
            ]}></Cart>}>
            </Route>


        </Routes>
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
