import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { auth } from "./../../../utils/firebase";

type LoginPageProps = { onExit: any; onRegisterClick: any };

function LoginPage(props: LoginPageProps): JSX.Element {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //const [hide, setHide] = useState("");

  const { login } = useAuth();

  const [error, setError] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.currentTarget.value });
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.currentTarget.value });
  };

  const onContainerClick = (event: any) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      props.onExit();
    }
  };

  const preventDefaultClick = (event: any) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: any) => {
    console.log("submitting");
    e.preventDefault();
    setError("");
    console.log(user);
    try {
      await login(user.email, user.password).then((userCredential) => {
        navigate("/shop");
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
      <div
        className={styles.loginpagecontainer + " "}
        onClick={onContainerClick}
      >
        {error && <p>{error}</p>}
        <div className={styles.loginwrapper} onClick={preventDefaultClick}>
          <form name={"loginForm"} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <h3>Email</h3>
            <input
              title={"email"}
              type="text"
              onChange={handleChangeEmail}
            ></input>
            <h3>Password</h3>
            <input
              title={"password"}
              type="password"
              onChange={handleChangePassword}
            ></input>
            <div className={styles.register}></div>
            <div className={styles.bottom}>
              <div className={styles.buttons}>
                <button
                  title={"loggin"}
                  type={"submit"}
                  className={styles.login}
                  onClick={handleSubmit}
                >
                  <b>Login</b>
                </button>
              </div>

              <div className={styles.registertext}>
                <div>Need an account?</div>
                <div>
                  <b title={"register"} onClick={() => props.onRegisterClick()}>
                    Register
                  </b>{" "}
                  here
                </div>
                <b title={"logout"} onClick={() => auth.signOut()}>
                  Log out
                </b>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
