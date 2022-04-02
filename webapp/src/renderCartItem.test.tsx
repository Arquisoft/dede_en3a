import {render} from "@testing-library/react";
import ProductCartItem from "./components/Cart/ProductCartItem/ProductCartItem";
import {CartItem} from "./redux/models/CartItem";
import {Product} from "./api/model/product";
import {Provider} from "react-redux";
import {store} from "./redux/store";

test ( 'the cartItem is rendered', async () => {

    const productTest:Product = { id: "1", img:"", price:1, title:"product1" };
    const cartItem:CartItem = { product:productTest, amount:1 };
    const {getByText} = render( <Provider store={store}><ProductCartItem product={cartItem}></ProductCartItem></Provider> );
    expect(getByText(cartItem.product.id)).toBeInTheDocument();

} );