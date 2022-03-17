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
import {getFunctions, httpsCallable} from "firebase/functions";

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
  const currentUser = useAuth().getCurrentUser();


    const  add = async () => {


        const sendOrder = httpsCallable(getFunctions(), 'sendOrder');

        return await sendOrder({
            items:products,
            user:currentUser?.email,
            address:"Casa de " + currentUser?.email
        })
            .then(( ) => {
                console.log("Your order has been processed.");
            }).catch(()=>{

                console.log("Sorry, we are suffering technical problems, try again...");

            });

    }


  products.forEach((cartItem) => {
    if (cartItem.amount > 0) {
      itemList.push(<ProductCartItem product={cartItem}></ProductCartItem>);
    }
  });



  const userRegistered = () => {
    return currentUser !== null;
  };


  const buy = () => {
    if (userRegistered()) {

       add().then(()=>{

       });

    } else {
      navigate("/login");
    }
  };

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
            <button type={"submit"} className="buy" onClick={buy}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
