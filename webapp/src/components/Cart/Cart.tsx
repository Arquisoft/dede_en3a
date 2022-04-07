import TopMenu from "../menu/TopMenu";
import styles from "./Cart.module.scss";
import { CartItem } from "../../redux/models/CartItem";
import ProductCartItem from "./ProductCartItem/ProductCartItem";
import { shallowEqual, useSelector } from "react-redux";
import { DedeStore } from "../../redux/store";
import React from "react";
import { useNavigate } from "react-router-dom";
import productCartItem from "./ProductCartItem/ProductCartItem";
import { useAuth } from "../../context/AuthContext";
import POD from "./POD/POD";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
type CartProps = {};

function Cart(props: CartProps): JSX.Element {
  const navigate = useNavigate();

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

  return (
    <>
      <TopMenu></TopMenu>
      <div className={styles.cartcontainer}>
        <div className={styles.headercontainer}>
          <div className={styles.header}>
            <div title={"shoppingCartTitle"}  className={styles.title}>Shopping Cart</div>
            <div title={"total"} className={styles.subtitle}></div>
            Total: ${calculateTotal(products).toFixed(2)}
          </div>
        </div>
        <div className={styles.podcontainer}>
          <POD />
        </div>
        <div className={styles.cartcontent}>
          <div className={styles.carditemcardcontainer}>
            {/* {props.products.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              { itemList }
            )} */}
            {itemList}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
