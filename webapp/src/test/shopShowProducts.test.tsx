import {render} from "@testing-library/react";
import {Product} from "../api/model/product";
import CardItem from "../components/CardItem/CardItem";
import {Provider} from "react-redux";
import * as React from "react";
import {store} from "../redux/store";
import {BrowserRouter} from "react-router-dom";
import ShopPage from "../components/pages/shopPage/ShopPage";

test ( 'the cardItem is rendered in the ShopPage', async () => {

    const {getByTitle} = render( <BrowserRouter>
        <Provider store={store}>
            <ShopPage></ShopPage>
        </Provider>
    </BrowserRouter>);
    expect(getByTitle("products")).toBeInTheDocument();

} );

test ( 'the cardItem name is rendered', async () => {

    let product:Product = {
        id : "8ZIZkdsnZYUnf5PfOKCF",
        img: "https://www.sideraworks.com/wp-content/uploads/2020/09/gel-hidroalcoholico-deliplus.jpg",
        price: 1.5,
        title: "Gel hand sanitizer"};

    const {getByTitle} = render( <BrowserRouter>
        <Provider store={store}>
            <CardItem product={product} saveProductToCart={ () => null }></CardItem>
        </Provider>
    </BrowserRouter>);

    const name = getByTitle("cardItemName");
    expect(name).toBeInTheDocument();

} );

test ( 'the cardItem price is rendered', async () => {

    let product:Product = {
        id : "8ZIZkdsnZYUnf5PfOKCF",
        img: "https://www.sideraworks.com/wp-content/uploads/2020/09/gel-hidroalcoholico-deliplus.jpg",
        price: 1.5,
        title: "Gel hand sanitizer"};

    const {getByTitle} = render( <BrowserRouter>
        <Provider store={store}>
            <CardItem product={product} saveProductToCart={ () => null }></CardItem>
        </Provider>
    </BrowserRouter>);

    const price = getByTitle("cardItemPrice");
    expect(price).toBeInTheDocument();

} );

test ( 'the cardItem rating is rendered', async () => {

    let product:Product = {
        id : "8ZIZkdsnZYUnf5PfOKCF",
        img: "https://www.sideraworks.com/wp-content/uploads/2020/09/gel-hidroalcoholico-deliplus.jpg",
        price: 1.5,
        title: "Gel hand sanitizer"};

    const {getByTitle} = render( <BrowserRouter>
        <Provider store={store}>
            <CardItem product={product} saveProductToCart={ () => null }></CardItem>
        </Provider>
    </BrowserRouter>);

    const rating = getByTitle("cardItemRating");
    expect(rating).toBeInTheDocument();

} );

test ( 'the cardItem addButton is rendered', async () => {

    let product:Product = {
        id : "8ZIZkdsnZYUnf5PfOKCF",
        img: "https://www.sideraworks.com/wp-content/uploads/2020/09/gel-hidroalcoholico-deliplus.jpg",
        price: 1.5,
        title: "Gel hand sanitizer"};

    const {getByTitle} = render( <BrowserRouter>
        <Provider store={store}>
            <CardItem product={product} saveProductToCart={ () => null }></CardItem>
        </Provider>
    </BrowserRouter>);

    const button = getByTitle("cardItemAddButton");
    expect(button).toBeInTheDocument();

} );
/*
test ( 'the review page is rendered', async () => {

    let product:Product = {
        id : "8ZIZkdsnZYUnf5PfOKCF",
        img: "https://www.sideraworks.com/wp-content/uploads/2020/09/gel-hidroalcoholico-deliplus.jpg",
        price: 1.5,
        title: "Gel hand sanitizer"};

    const {getByTitle} = render( <BrowserRouter>
        <Provider store={store}>
            <CardItem product={product} saveProductToCart={ () => null }></CardItem>
        </Provider>
    </BrowserRouter>);
    expect(getByTitle("products")).toBeInTheDocument();

} );*/