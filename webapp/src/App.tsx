import React, { useState, useEffect } from "react";
import { getUsers } from "./api/api";
import { User } from "./api/model/user";
import "./App.scss";
import "./Styles.scss";
import MainPage from "./components/pages/mainPage/MainPage";
import TopMenu from "./components/menu/TopMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/CartItem/CartItem";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";

function App(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  };

  useEffect(() => {
    refreshUserList();
  }, []);

  const item1 = {
    name: "Balón",
    img: "https://i8.amplience.net/t/jpl/jdes_product_list?plu=jd_500507_bl&qlt=92&w=363&h=363&v=1&fmt=auto",
    price: 120,
  };
  const item2 = {
    name: "Gorrita",
    img: "https://i8.amplience.net/t/jpl/jdes_product_list?plu=jd_562055_bl&qlt=92&w=363&h=363&v=1&fmt=auto",
    price: 220,
  };
  const item3 = {
    name: "Mochila",
    img: "https://i8.amplience.net/t/jpl/jdes_product_list?plu=jd_571269_bl&qlt=92&w=363&h=363&v=1&fmt=auto",
    price: 40,
  };
  const item4 = {
    name: "Guantes",
    img: "https://i8.amplience.net/t/jpl/jdes_product_list?plu=jd_571266_bl&qlt=92&w=363&h=363&v=1&fmt=auto",
    price: 20,
  };

  const products = [item1, item2, item3];

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/cart" element={<Cart products={products} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
