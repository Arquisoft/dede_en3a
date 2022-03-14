import TopMenu from "../menu/TopMenu";
import "./Cart.scss";
import { CartItem } from "../../redux/models/CartItem";
import ProductCartItem from "./ProductCartItem/ProductCartItem";
import { shallowEqual, useSelector } from "react-redux";
import { DedeStore } from "../../redux/store";

type CartProps = {};

function Cart(props: CartProps): JSX.Element {
  const calculateTotal = (items: CartItem[]) =>
    items.reduce(
      (ack: number, item) => ack + item.product.price! * item.amount,
      0
    ); //+ item.price

  let itemList: JSX.Element[] = [];

  const products: CartItem[] = useSelector(
    (state: DedeStore) => state.cart,
    shallowEqual
  );

  products.forEach((cartItem) => {
    if( cartItem.amount > 0 ){
      itemList.push(<ProductCartItem product={cartItem}></ProductCartItem>);
    }

  });

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
        </div>
      </div>
    </>
  );
}

export default Cart;
