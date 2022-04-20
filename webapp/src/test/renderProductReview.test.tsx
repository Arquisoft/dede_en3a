import {Product} from "../api/model/product";
import {fireEvent, render} from "@testing-library/react";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import * as React from "react";
import ProductDetails from "../components/pages/shopPage/productDetails/ProductDetails";
import CardItem from "../components/CardItem/CardItem";
import {CartItem} from "../redux/models/CartItem";

let product:Product = {
    id : "8ZIZkdsnZYUnf5PfOKCF",
    img: "https://www.sideraworks.com/wp-content/uploads/2020/09/gel-hidroalcoholico-deliplus.jpg",
    price: 1.5,
    title: "Gel hand sanitizer"};

let cartItem:CartItem = {
    product: product,
    amount: 1
}

/*
test ( 'the review title is rendered', async () => {

    useParams();

    const {getByTitle} = render( <BrowserRouter>
        <Provider store={store}>
            <Routes>
            <Route path={product.id} element={<ProductDetails />}></Route>
            </Routes>
        </Provider>
    </BrowserRouter>);

    const title = getByTitle("reviewTitle");

    expect(title).toBeInTheDocument();

} );

test ( 'the review text is rendered', async () => {

    const {getByTitle} = render( <BrowserRouter>
        <Provider store={store}>
            <CardItem product={product} saveProductToCart={()=>null}></CardItem>
        </Provider>
    </BrowserRouter>);

    const title = getByTitle("reviewTitle");

    expect(title).toBeInTheDocument();

} );

test ( 'the review title is rendered', async () => {

    const {getByTitle} = render( <BrowserRouter>
        <Provider store={store}>
            <ProductDetails></ProductDetails>
        </Provider>
    </BrowserRouter>);

    const title = getByTitle("reviewTitle");

    expect(title).toBeInTheDocument();

} );*/