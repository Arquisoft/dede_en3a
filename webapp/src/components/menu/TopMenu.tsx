import "./TopMenu.scss";
import logo from "./../../logo.svg";

type TopMenuProps = {};

function TopMenu(): JSX.Element {

  return (
    <>
      <div className="menu-container">
        <div className="menu">
          <img src={logo} className="logo" alt="logo" />
          <div className="links">
            <div className="menu-item">Home</div>
            <div className="menu-item">Shop</div>
            <div className="menu-item">About us</div>
            <div className="menu-item">Contact</div>
            <div className="menu-item" ><a href="/Cart">Cart</a></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopMenu;
