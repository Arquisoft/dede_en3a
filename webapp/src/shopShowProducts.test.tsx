import {render} from "@testing-library/react";
import {Product} from "./api/model/product";
import CardItem from "./components/CardItem/CardItem";
import {Dispatch} from "redux";
import {Provider, useDispatch} from "react-redux";
import {increase} from "./redux/actions";
import * as React from "react";
import {store} from "./redux/store";

const dispatch: Dispatch<any> = useDispatch();

const saveProduct = React.useCallback(
    (product: Product) => dispatch(increase(product)),
    [dispatch]
);

test ( 'the cardItem is rendered in the ShopPage', async () => {

    const productTest:Product = { id: "1", img:"none", price:1, title:"product1" };
    const {getByText} = render( <Provider store={store}>
                                     <CardItem product={productTest} saveProductToCart={saveProduct}></CardItem>
                                </Provider> );
    expect(getByText(productTest.id)).toBeInTheDocument();

} );