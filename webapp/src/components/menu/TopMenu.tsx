import "./TopMenu.scss";
import logo from "./../../logo.svg";
import { useNavigate } from "react-router-dom";

function TopMenu(): JSX.Element {
  const navigate = useNavigate();

  const url = window.location.href.split("/");

  const path = url[1];

  let homeClass = "menu-item";
  if (path === "home") homeClass = "menu-item selected";
  return (
    <>
      <div className="menu-container">
        <div className="menu">
          <img src={logo} className="logo" alt="logo" />
          <div className="links">
            <div className={homeClass} onClick={() => navigate("/home")}>
              Home
            </div>
            <div onClick={ () => navigate("/shop") } className="menu-item">Shop</div>
            <a href={"https://arquisoft.github.io/dede_en3a/"}>
              <div className="menu-item">About us</div>
            </a>
            <div onClick={ () => navigate("/contact") }className="menu-item">Contact</div>
            <div onClick={ () => navigate("/orders") }className="menu-item">Orders</div>
            <div onClick={ () => navigate("/cart") } className="menu-item">Cart</div>
          </div>
          <span
            className="material-icons login-icon"
            onClick={() => navigate("/login")}
          >
            account_circle
          </span>
        </div>
      </div>
    </>
  );
}

export default TopMenu;
