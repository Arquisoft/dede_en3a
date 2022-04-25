import styles from "./TopMenu.module.scss";
import logo from "./../../logo.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DedeStore } from "../../redux/store";
import { Component, Dispatch, useEffect, useState } from "react";
import { CartItem } from "../../redux/models/CartItem";
import { getAuth } from "firebase/auth";
import React from "react";
import { SubtitlesOutlined } from "@mui/icons-material";
import LoginPage from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { Utils } from "../../utils/utilts";
import { Product } from "../../api/model/product";
import { decrease, increase } from "../../redux/actions";

type TopMenuProps = {};

export default function TopMenu(): JSX.Element {
  const [wobble, setWobble] = useState("");
  const [transparent, setTransparent] = useState("");
  const [firstRender, setfirstRender] = useState(true);
  const [loginPage, setLoginPage] = useState(<div></div>);
  const [registerPage, setRegisterPage] = useState(<div></div>);
  const [expandableRightMenuClass, setExpandableRightMenuClass] = useState(
    styles.expandablerightmenu
  );

  let totalProducts : number = 0;

  const dispatch: Dispatch<any> = useDispatch();

  const increaseProduct = React.useCallback(
    (product: Product) => dispatch(increase(product)),
    [dispatch]
  );

  const decreaseProduct = React.useCallback(
    (product: Product) => dispatch(decrease(product)),
    [dispatch]
  );

  const increaseButtonAction = (product: Product) => {
    increaseProduct(product);
  };

  const decreaseButtonAction = (product: Product) => {
    decreaseProduct(product);
  };

  function totalNumProd():number{
    let num = 0;
    let total = 0;
    while(num < cart.length){
      total += cart[num].amount;
      num++;
    }
    totalProducts = total;
    return total;
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []); //Will only be called once upon initialization

  function handleScroll(event: any) {
    if (window.scrollY !== 0) {
      setTransparent(styles.colored);
    } else {
      setTransparent("");
    }
  }
  const [userName, setUserName] = useState(getAuth().currentUser?.email);

  const [expandableMenuClass, setExpandableMenuClass] = useState(
    styles.expandablemenu
  );
  const navigate = useNavigate();

  const url = window.location.href.split("/");

  const path = url[1];
  getAuth().onAuthStateChanged((changedAuth) => {
    setUserName(changedAuth?.email);
  });
  const cart = useSelector((state: DedeStore) => state.cart);

  let cartMenuItems = [<></>];

  let index = 0;
  cart.forEach((product) => {
    const pHtml = (
      <div key={index} className={styles.cartmenuitem}>
        <img src={product.product.img}></img>
        <div className={styles.iteminfo}>
          <b>{product.product.name}</b>
          <span>
            <b>{product.product.price}</b> € x {product.amount}
          </span>
          <div className={styles.buttons}>
            <b onClick={() => decreaseButtonAction(product.product)}>-</b>
            <b onClick={() => increaseButtonAction(product.product)}>+</b>
          </div>
        </div>
      </div>
    );
    index++;
    cartMenuItems.push(pHtml);
  });
  cartMenuItems.push(<hr></hr>);

  const expandLeftMenu = () => {
    setExpandableMenuClass(
      expandableMenuClass === styles.expandablemenu
        ? styles.expandablemenu + " " + styles.showmenu
        : styles.expandablemenu
    );
  };

  const expandRightMenu = () => {
    setExpandableRightMenuClass(
      expandableRightMenuClass === styles.expandablerightmenu
        ? styles.expandablerightmenu + " " + styles.showcartmenu
        : styles.expandablerightmenu
    );
  };

  useEffect(() => {
    if (firstRender) {
      setfirstRender(false);
    } else {
      setWobble(styles.wobble);
    }
  }, [cart]);

  const loginPageProps = {
    onExit: () => setLoginPage(<div></div>),
    onRegisterClick: () => {
      setLoginPage(<div></div>);
      setRegisterPage(
        <RegisterPage
          onExit={() => setRegisterPage(<div></div>)}
        ></RegisterPage>
      );
    },
  };

  let homeClass = styles.menuitem;
  if (path === "home") homeClass = styles.menuitem + " " + styles.selected;
  return (
    <>
      {/* Modal pages */}
      {loginPage}
      {registerPage}
      {/* Normal menu */}
      <div className={styles.menucontainer + " " + transparent}>
        <div className={styles.menu}>
          <img src={logo} className={styles.logo} alt="logo" />
          <div className={styles.links}>
            <div
              title={"home"}
              className={homeClass}
              onClick={() => navigate("/home")}
            >
              Home
            </div>
            <div
              title={"shop"}
              className={styles.menuitem}
              onClick={() => navigate("/shop")}
            >
              Shop
            </div>
            <div>
              <div
                title={"about"}
                className={styles.menuitem}
                onClick={() => {
                  navigate("/about");
                }}
              >
                About us
              </div>
            </div>
            <div
              title={"contact"}
              className={styles.menuitem}
              onClick={() => navigate("/contact")}
            >
              Contact
            </div>
            <div
              title={"orders"}
              className={styles.menuitem}
              onClick={() => navigate("/orders")}
            >
              Orders
            </div>
            <div className={styles.cartcontainer}>
              <span
                title={"cart"}
                className={"material-icons " + styles.loginicon + " " + wobble}
                onClick={() => expandRightMenu()}
                onAnimationEnd={() => setWobble("")}
              >
                shopping_cart
              </span>
              <div className={styles.cartcounter}>{totalNumProd()}</div>
            </div>
          </div>
          <div title={"loginTopMenu"} className={styles.logincontainer}>
            <span
              title={"login-pc"}
              className={"material-icons " + styles.loginicon}
              onClick={() =>
                setLoginPage(<LoginPage {...loginPageProps}></LoginPage>)
              }
            >
              account_circle
            </span>
            <div className={styles.username}>{userName}</div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={styles.mobilemenucontainer}>
        <div className={styles.menu}>
          <span
            className={
              "material-icons " + styles.loginicon + " " + styles.menuicon
            }
            onClick={() => expandLeftMenu()}
          >
            menu
          </span>
          <img src={logo} className={styles.logo} alt="logo" />
          <div className={styles.cartcontainer}>
            <span
              className={"material-icons " + styles.loginicon + " " + wobble}
              onClick={() => expandRightMenu()}
              onAnimationEnd={() => setWobble("")}
            >
              shopping_cart
            </span>
            <div className={styles.cartcounter}>{totalNumProd()}</div>
          </div>
          <div className={styles.logincontainer}>
            <span
              title={"login-mobile"}
              className={"material-icons " + styles.loginicon}
              onClick={() =>
                setLoginPage(<LoginPage {...loginPageProps}></LoginPage>)
              }
            >
              account_circle
            </span>
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
              expandLeftMenu();
            }}
          >
            Home
          </div>
          <div
            className={styles.menuitem}
            onClick={() => {
              navigate("/shop");
              expandLeftMenu();
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
                expandLeftMenu();
              }}
            >
              About us
            </div>
          </div>
          <div
            className={styles.menuitem}
            onClick={() => {
              navigate("/contact");
              expandLeftMenu();
            }}
          >
            Contact
          </div>
          <div
            className={styles.menuitem}
            onClick={() => {
              navigate("/orders");
              expandLeftMenu();
            }}
          >
            Orders
          </div>
        </div>
      </div>

      {/* Expandable cart right menu */}
      <div className={expandableRightMenuClass}>
        <div className={styles.menuitemscontainer}>{cartMenuItems}</div>

        <div className={styles.totalcartprice}>
          Total: <b>{Utils.calculateTotal(cart).toFixed(2)}</b>
        </div>
        <div onClick={() => navigate("/cart")} className={styles.cartproceed}>
          Continue
        </div>
      </div>
    </>
  );
}
