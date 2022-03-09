import "./TopMenu.scss";
import logo from "./../../logo.svg";
import { useNavigate } from "react-router-dom";

type TopMenuProps = {};

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
            <div className="menu-item">Shop</div>
            <div className="menu-item">About us</div>
            <div className="menu-item">Contact</div>
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
