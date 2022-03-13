import "../CardItem/CardItem.scss";
import { Product } from "../../api/model/product";
import TopMenu from "../menu/TopMenu";
import "./CartItem.scss";
import {CartItem} from "../../redux/models/CartItem";

type CartProps = {
  products: CartItem[];
};

function Cart(props: CartProps): JSX.Element {

  const calculateTotal = (items: CartItem[]) =>
    items.reduce((ack: number, item) => ack + item.product.price! * item.amount, 0); //+ item.price

  return (
    <>
        <TopMenu></TopMenu>

        <div className="cart-container">
            <div className="header-container">
                <div className="header">
                    <div className="title">Shopping Cart</div>
                    <div className="subtitle">Total: ${calculateTotal(props.products).toFixed(2)}</div>
                </div>
                <div className="product-card-container">{props.products.length === 0 ?
                    <p>Your cart is empty.</p> :
                    props.products.map((p) => (<div> {p.product.name} </div>
                    ))}
                </div>
            </div>

        </div>
    </>
  );
}

export default Cart;
