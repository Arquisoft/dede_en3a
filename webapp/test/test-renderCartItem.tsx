import {render} from "@testing-library/react";
import ProductCartItem from "../src/components/Cart/ProductCartItem/ProductCartItem";
import {CartItem} from "../src/redux/models/CartItem";
import {Product} from "../src/api/model/product";

test ( 'the cartItem is rendered', async () => {

    const productTest:Product = { id: "1", img:"", price:1, title:"product1" };
    const cartItem:CartItem = { product:productTest, amount:1 };
    const {getByText} = render( <ProductCartItem product={cartItem}></ProductCartItem> );
    expect(getByText(cartItem.product.id)).toBeInTheDocument();

} );