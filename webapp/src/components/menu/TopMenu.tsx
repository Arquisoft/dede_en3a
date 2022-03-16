import styles from "./TopMenu.module.scss";
import logo from "./../../logo.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DedeStore } from "../../redux/store";
import { Component, useEffect, useState } from "react";
import { CartItem } from "../../redux/models/CartItem";

type TopMenuProps = {};
function TopMenu(): JSX.Element {
  const [wobble, setWobble] = useState(String);
  const navigate = useNavigate();

  const url = window.location.href.split("/");

  const path = url[1];

  const cart = useSelector((state: DedeStore) => state.cart);

  const endWobble = () => {
    console.log("endWobble");

    setWobble("");
  };

  let homeClass = styles.menuitem;
  if (path === "home") homeClass = styles.menuitem + " " + styles.selected;
  return (
    <>
      <div className={styles.menucontainer}>
        <div className={styles.menu}>
          <img src={logo} className={styles.logo} alt="logo" />
          <div className={styles.links}>
            <div className={homeClass} onClick={() => navigate("/home")}>
              Home
            </div>
            <div className={styles.menuitem}>Shop</div>
            <div className={styles.menuitem}>About us</div>
            <div className={styles.menuitem}>Contact</div>
            <div className={styles.cartcontainer} onAnimationEnd={endWobble}>
              <span
                className={"material-icons " + styles.loginicon}
                onClick={() => navigate("/cart")}
              >
                shopping_cart
              </span>
              <div className={styles.cartcounter}>{cart.length}</div>
            </div>
          </div>
          <span
            className={"material-icons " + styles.loginicon}
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
