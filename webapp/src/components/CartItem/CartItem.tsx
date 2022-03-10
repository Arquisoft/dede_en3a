import "../CardItem/CardItem.scss";
import { Product } from "../../api/model/product";
import TopMenu from "../menu/TopMenu";
import "./CartItem.scss";

type CartProps = {
  products: Product[];
};

function Cart(props: CartProps): JSX.Element {

    //props.products = sessionStorage.

  const calculateTotal = (items: Product[]) =>
    items.reduce((ack: number, item) => ack, 0); //+ item.price

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
                    props.products.map((p) => (<div> {p.title} </div>
                    ))}
                </div>
            </div>

        </div>
    </>
  );
}

export default Cart;
