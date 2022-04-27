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
import { Utils } from "../../utils/utilts";
import HeaderBackground from "../HeaderBackground/HeaderBackground";
type CartProps = {};

function Cart(props: CartProps): JSX.Element {
  const navigate = useNavigate();

  const calculateTotal = (items: CartItem[]) => Utils.calculateTotal(items);
  let itemList: JSX.Element[] = [];

  const shippingCost: number | null = useSelector(
    (state: DedeStore) => state.shippingCost
  );

  const getEstimatedDeliveryDate = () => {
    if (estimatedDelivery) return new Date(estimatedDelivery).toDateString();
    return "";
  };

  const estimatedDelivery: number | null = useSelector(
    (state: DedeStore) => state.estimatedDelivery
  );
  const products: CartItem[] = useSelector((state: DedeStore) => state.cart);

  products.forEach((cartItem) => {
    if (cartItem.amount > 0) {
      itemList.push(<ProductCartItem product={cartItem}></ProductCartItem>);
    }
  });

  return (
    <>
      <TopMenu></TopMenu>
      <HeaderBackground></HeaderBackground>
      <div className={styles.cartcontainer}>
        <div className={styles.headercontainer}>
          <div className={styles.header}></div>
        </div>
        <div className={styles.bodycontainer}>
          <div className={styles.cartcontent}>
            <div className={styles.cartitemtitle}>
              <b title={"itemsInYourCart"}>({products.length})</b> Items in your
              cart
            </div>
            <hr></hr>

            <div className={styles.carditemcardcontainer}>
              {/* {props.products.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              { itemList }
            )} */}
              {itemList}
            </div>
            <div title={"shippingCosts"} className={styles.totalPrice}>
              Shipping costs:
              <b>
                {shippingCost
                  ? shippingCost + " €"
                  : "Use your pod adress to calculate"}{" "}
              </b>
            </div>
            <div title={"total"} className={styles.totalPrice}>
              Total:
              <b>{Utils.calculateTotal(products, shippingCost).toFixed(2)} €</b>
            </div>
            <div title={"total"} className={styles.totalPrice}>
              Estimated delivery date:
              <b>{getEstimatedDeliveryDate()}</b>
            </div>
          </div>

          <div className={styles.podcontainer}>
            <POD />
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
