import {render} from "@testing-library/react";
import {Product} from "../src/api/model/product";
import CardItem from "../src/components/CardItem/CardItem";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {increase} from "../src/redux/actions";
import * as React from "react";

const dispatch: Dispatch<any> = useDispatch();

const saveProduct = React.useCallback(
    (product: Product) => dispatch(increase(product)),
    [dispatch]
);

test ( 'the cardItem is rendered in the ShopPage', async () => {

    const productTest:Product = { id: "1", img:"none", price:1, title:"product1" };
    const {getByText} = render( <CardItem product={productTest} saveProductToCart={saveProduct}></CardItem> );
    expect(getByText(productTest.id)).toBeInTheDocument();

} );