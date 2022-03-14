import "../CardItem/CardItem.scss";
import { Product } from "../../api/model/product";
import TopMenu from "../menu/TopMenu";
import "./CartItem.scss";

type CartProps = {
  products: Product[];
};

function Cart(props: CartProps): JSX.Element {
  const calculateTotal = (items: Product[]) =>
    items.reduce((ack: number, item) => ack, 0); //+ item.price

  return (
    <>
        <TopMenu></TopMenu>
        <div className="cart-container">
          <h2>Your Shopping Cart</h2>

            {props.products.length === 0 ? <p>No items</p> : null}
            {props.products.map((p) => (
              <div> {p.title} </div>
            ))}

          <h2>Total: ${calculateTotal(props.products).toFixed(2)}</h2>
        </div>
    </>
  );
}

export default Cart;
