import {fireEvent, render} from "@testing-library/react";
import {useDispatch, useSelector} from "react-redux";
import {DedeStore} from "../../src/redux/store";
import CardItem from "../../src/components/CardItem/CardItem";
import {Product} from "../../src/api/model/product";
import {Dispatch} from "redux";
import {increase} from "../../src/redux/actions";
import * as React from "react";
/*
const cart = useSelector((state: DedeStore) => state.cart);

const dispatch: Dispatch<any> = useDispatch();

const saveProduct = React.useCallback(
    (product: Product) => dispatch(increase(product)),
    [dispatch]
);

test ( 'add a product to the shopping cart', async () => {
    //The Cart is empty
    expect(cart.length === 0);
    //We add a product
    const productTest:Product = { id: "1", img:"", price:1, title:"product1" };
    const {getByText} = render( <CardItem product={productTest} saveProductToCart={saveProduct}></CardItem> );
    const button = getByText("add-to-cart");
    fireEvent.click(button);
    //The Cart contains the product
    expect(getByText( productTest.id )).toBeInTheDocument();
    expect(cart.length === 1);
} );*/