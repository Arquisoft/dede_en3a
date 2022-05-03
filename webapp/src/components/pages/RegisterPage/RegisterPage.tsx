import React, {useEffect, useState} from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../api/api";
import TopMenu from "../../menu/TopMenu";

import styles from "./RegisterPage.module.scss";
import Modal from "../../Modal/Modal";
type RegisterPageProps = {
  onExit: any;
};

export function RegisterPage(props: RegisterPageProps) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPssw: "",
    name: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [resultModal, setResultModal] = React.useState(<></>);





  const errorModalHtml = (
      <div className={styles.modalerror}>
        <div className={styles.titleError}> {error} </div>

        <div className={styles.accept} onClick={() => setResultModal(<></>)}>
          Accept
        </div>
      </div>
  );

  useEffect(() => {

        if(error){
          setResultModal(<Modal element={errorModalHtml}></Modal>)
        }
      }
      , [error]);

  const successModalHtml = (

      <div className={styles.sucessfulorder}>
        <div className={styles.title}>Congratulations, you have created a DEDE Account!</div>
        <div className={styles.subtitle}>
          Start shopping whenever you want...
        </div>
        <div className={styles.accept} onClick={() => {setResultModal(<></>); navigate("/shop");}}>
          Start Shopping
        </div>
      </div>

  );





  const onContainerClick = (event: any) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      props.onExit();
    }
  };

  const preventDefault = (event: any) => {
    event.preventDefault();
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.currentTarget.value });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.currentTarget.value });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.currentTarget.value });
  };

  const handleChangeConfirmPasswd = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUser({ ...user, confirmPssw: e.currentTarget.value });
  };

  const register = async () => {
    try {
      if (user.password != user.confirmPssw) {
        setError("Passwords are different.");
        return
      }

      await signup(user.email, user.password).then( (userCredential) => {
        console.log(
          "User: " + userCredential.user,
          "ProviderId: " + userCredential.providerId
        );



        setResultModal(<Modal element={successModalHtml}></Modal>)
      });

      await addUser({
        name: user.name,
        email: user.email,
      });


    } catch (error: any) {
      if (error.code === "auth/internal-error") {
        setError("Invalid email format.");

      } else if (error.code === "auth/email-already-in-use") {
        setError("Email already registered");

      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters");
      } else {
        setError("Unknown error :( Please try again...");
      }

    }
  };


  return (
    <div>
      <div className={styles.registerpagecontainer} onClick={onContainerClick}>


        <div className={styles.registerwrapper} onClick={preventDefault}>
          <form name={"registerForm"} onSubmit={register}>
            <h2 title={"registerTitle"} >Register</h2>
            <label title={"emailLabel"} htmlFor="email">Email</label>
            <input title={"emailInput"} type={"email"} name="email" onChange={handleChangeEmail} />
            <br />

            <label title={"nameLabel"} htmlFor="name">Name & Surname</label>
            <input title={"nameInput"} type={"text"} name="name" onChange={handleChangeName} />
            <br />
            <label title={"passwordLabel"} htmlFor={"password"}>Password</label>
            <input
                title={"passwordInput"}
              type={"password"}
              name="password"
              id={"password"}
              onChange={handleChangePassword}
            />
            <br />

            <label title={"confirmLabel"} htmlFor={"confirmPasswd"}>Confirm Password</label>
            <input
                title={"confirmInput"}
              type={"password"}
              name="confirmPasswd"
              id={"confirmPasswd"}
              onChange={handleChangeConfirmPasswd}
            />
            <br />

            <div className={styles.buttons}>
              <button type="submit" onClick={register}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      {resultModal}
    </div>
  );
}
