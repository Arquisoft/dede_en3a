import { useNavigate } from "react-router-dom";
import TopMenu from "../../menu/TopMenu";
import "./LoginPage.scss";
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { auth } from "./../../../utils/firebase";

type LoginPage = {};

function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const [error, setError] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.currentTarget.value });
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.currentTarget.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    console.log(user);
    try {
      await login(user.email, user.password).then((userCredential) => {
        navigate("/dashboard");
      });
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else if (error.code === "auth/wrong-password") {
        setError("Wring password for provided user");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <TopMenu></TopMenu>
      <div className="login-page-container">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="login-wrapper">
            <h2>Login</h2>
            <h3>Email</h3>
            <input type="text" onChange={handleChangeEmail}></input>
            <h3>Password</h3>
            <input type="password" onChange={handleChangePassword}></input>
            <div className="register"></div>
            <div className="buttons">
              <button type={"submit"} className="login">
                Login
              </button>
            </div>

            <div className="register-text">
              Need an account?{" "}
              <b onClick={() => navigate("/register")}>Register</b> here
              <br></br>
              <b onClick={() => auth.signOut()}>Log out</b>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
