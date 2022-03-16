import TopMenu from "../menu/TopMenu";
import "./Cart.scss";
import { CartItem } from "../../redux/models/CartItem";
import ProductCartItem from "./ProductCartItem/ProductCartItem";
import { shallowEqual, useSelector } from "react-redux";
import { DedeStore } from "../../redux/store";
import React from "react";
import { useNavigate } from "react-router-dom";
import productCartItem from "./ProductCartItem/ProductCartItem";
import { useAuth } from "../../context/AuthContext";

type CartProps = {};

function Cart(props: CartProps): JSX.Element {
  const navigate = useNavigate();
  const currentUser = useAuth().getCurrentUser();

  const calculateTotal = (items: CartItem[]) => {
    console.log("recalculate");
    return items.reduce(
      (ack: number, item) => ack + item.product.price! * item.amount,
      0
    ); //+ item.price
  };

  let itemList: JSX.Element[] = [];

  const products: CartItem[] = useSelector((state: DedeStore) => state.cart);

  products.forEach((cartItem) => {
    if (cartItem.amount > 0) {
      itemList.push(<ProductCartItem product={cartItem}></ProductCartItem>);
    }
  });

  const checkUserRegistered = () => {
    if (!currentUser?.uid) {
      //<span className="popuptext" id="myPopup">You need to Login</span>;
      //new Promise(f => setTimeout(f, 10000));
      console.log("false");
      navigate("/login");
    } else {
      buy();
    }
  };

  function buy() {
    console.log("buy");
  }

  return (
    <>
      <TopMenu></TopMenu>

      <div className="cart-container">
        <div className="header-container">
          <div className="header">
            <div className="title">Shopping Cart</div>
            <div className="subtitle">
              Total: ${calculateTotal(products).toFixed(2)}
            </div>
          </div>
          <div className="card-item-card-container">
            {/* {props.products.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              { itemList }
            )} */}
            {itemList}
          </div>
          <div className="buttons">
            <button
              type={"submit"}
              className="buy"
              onClick={checkUserRegistered}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
