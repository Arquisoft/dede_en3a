import "../CardItem/CardItem.scss";
import "../CardItem/CardItem";
import { Product } from "../../api/model/product";
import "./Cart.scss"

type CartProps = {
    products: Product[];
}

function Cart(props: CartProps): JSX.Element {

    const calculateTotal = (items: Product[]) =>
        items.reduce((ack: number, item) => ack + 0, 0); //item.price

    return (
        <>
            <h2>Your Shopping Cart</h2>
            <div className="container">
                { props.products.length === 0 ? <p>No items</p> : null }
                {() => props.products.forEach( ( p ) => (
                    <div> {p.title} </div>
                ))}
            </div>
            <h2>Total: ${calculateTotal(props.products).toFixed(2)}</h2>
        </>
    );
}

export default Cart;