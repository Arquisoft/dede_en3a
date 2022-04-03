import {render} from "@testing-library/react";
import {Product} from "../api/model/product";
import CardItem from "../components/CardItem/CardItem";
import {Provider, useDispatch} from "react-redux";
import * as React from "react";
import {store} from "../redux/store";
import {BrowserRouter} from "react-router-dom";

test ( 'the cardItem is rendered in the ShopPage', async () => {

    const productTest:Product = { id: "1", img:"none", price:1, title:"product1" };
    const {getByText} = render( <BrowserRouter>
                                    <Provider store={store}>
                                        <CardItem product={productTest} saveProductToCart={ ()=>null }></CardItem>
                                    </Provider>
                                </BrowserRouter>);
    expect(getByText("product1")).not.toBeInTheDocument();

} );