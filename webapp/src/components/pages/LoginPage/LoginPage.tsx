import { useNavigate } from "react-router-dom";
import CardItem from "../../CardItem/CardItem";
import TopMenu from "../../menu/TopMenu";
import "./LoginPage.scss";

type LoginPage = {};

function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <TopMenu></TopMenu>
      <div className="login-page-container">
        <div className="login-wrapper">
          <h2>Login</h2>
          <h3>Email</h3>
          <input type="text"></input>
          <h3>Password</h3>
          <input type="password"></input>
          <div className="register"></div>
          <div className="buttons">
            <button className="login">Login</button>
          </div>
          <div className="register-text">
            Need an account?{" "}
            <b onClick={() => navigate("/register")}>Register</b> here
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
