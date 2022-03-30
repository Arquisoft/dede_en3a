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
  const [expandableMenuClass, setExpandableMenuClass] = useState(
    styles.expandablemenu
  );
  const navigate = useNavigate();

  const url = window.location.href.split("/");

  const path = url[1];

  const cart = useSelector((state: DedeStore) => state.cart);

  const expandMenu = () => {
    console.log(expandableMenuClass);
    setExpandableMenuClass(
      expandableMenuClass === styles.expandablemenu
        ? styles.expandablemenu + " " + styles.showmenu
        : styles.expandablemenu
    );
  };

  const endWobble = () => {
    console.log("endWobble");

    setWobble("");
  };

  let homeClass = styles.menuitem;
  if (path === "home") homeClass = styles.menuitem + " " + styles.selected;
  return (
    <>
      {/* Normal menu */}
      <div className={styles.menucontainer}>
        <div className={styles.menu}>
          <img src={logo} className={styles.logo} alt="logo" />
          <div className={styles.links}>
            <div className={homeClass} onClick={() => navigate("/home")}>
              Home
            </div>
            <div className={styles.menuitem} onClick={() => navigate("/shop")}>
              Shop
            </div>
            <div>
              {/* <a href={"https://arquisoft.github.io/dede_en3a/"}> */}
              <div
                className={styles.menuitem}
                onClick={() => {
                  navigate("/about");
                  expandMenu();
                }}
              >
                About us
              </div>
            </div>
            <div
              className={styles.menuitem}
              onClick={() => navigate("/contact")}
            >
              Contact
            </div>
            <div
              className={styles.menuitem}
              onClick={() => navigate("/orders")}
            >
              Orders
            </div>
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
      {/* Mobile menu */}
      <div className={styles.mobilemenucontainer}>
        <div className={styles.menu}>
          <span
            className={
              "material-icons " + styles.loginicon + " " + styles.menuicon
            }
            onClick={() => expandMenu()}
          >
            menu
          </span>
          <img src={logo} className={styles.logo} alt="logo" />
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
      </div>

      {/* Expandable mobile left menu */}
      <div className={expandableMenuClass}>
        <div className={styles.links}>
          <div
            className={homeClass}
            onClick={() => {
              navigate("/home");
              expandMenu();
            }}
          >
            Home
          </div>
          <div
            className={styles.menuitem}
            onClick={() => {
              navigate("/shop");
              expandMenu();
            }}
          >
            Shop
          </div>
          <div>
            {/* <a href={"https://arquisoft.github.io/dede_en3a/"}> */}
            <div
              className={styles.menuitem}
              onClick={() => {
                navigate("/about");
                expandMenu();
              }}
            >
              About us
            </div>
          </div>
          <div
            className={styles.menuitem}
            onClick={() => {
              navigate("/contact");
              expandMenu();
            }}
          >
            Contact
          </div>
          <div
            className={styles.menuitem}
            onClick={() => {
              navigate("/orders");
              expandMenu();
            }}
          >
            Orders
          </div>
        </div>
      </div>
    </>
  );
}

export default TopMenu;
