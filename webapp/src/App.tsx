import React, { useState, useEffect } from "react";
import { getAdmin, getUsers } from "./api/api";
import { User } from "./api/model/user";
import "./App.scss";
import "./Styles.scss";
import MainPage from "./components/pages/mainPage/MainPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import ShopPage from "./components/pages/shopPage/ShopPage";
import ProductDetails from "./components/pages/shopPage/productDetails/ProductDetails";
import ContactPage from "./components/pages/ContactPage/ContactPage";
import OrdersPage from "./components/pages/OrdersPage/OrdersPage";
import POD from "./components/Cart/POD/POD";
import AboutPage from "./components/pages/AboutPage/AboutPage";
import AdminDashboard from "./components/Administration/AdminDashboard/AdminDashboard";
import { useAuth } from "./context/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Presentation from "./components/pages/PresentationPage/Presentation";

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/shop" element={<ShopPage />} />
          <Route path={"/product/:id"} element={<ProductDetails />}></Route>
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<Navigate to="/home" />} />
          {/*} <Route path={"/dashboard"} element={<Dashboard />} />*/};
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path={"/pod"} element={<POD />} />
          {/* Need to auth or something xD */}
          <Route path={"/admin"} element={<AdminDashboard />} />
          <Route
            path={"/presentation"}
            element={<Presentation></Presentation>}
          ></Route>
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
