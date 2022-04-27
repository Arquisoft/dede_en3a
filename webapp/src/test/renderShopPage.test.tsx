import {getByRole, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import * as React from "react";
import ShopPage from "../components/pages/shopPage/ShopPage";
test("the Shop title is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const shopTitle = getByTitle("ShopTitle");
    expect(shopTitle).toBeInTheDocument();

});

test("the card products are rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const products = getByTitle("products");
    expect(products).toBeInTheDocument();

});

test("the type header is rendered", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const text = getByText("Type");
    expect(text).toBeInTheDocument();

});

test("the type selector is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const text = getByTitle("select");
    expect(text).toBeInTheDocument();

});

test("the opening offer is rendered", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const text = getByText("Openning offer");
    expect(text).toBeInTheDocument();

});

test("the offer text is rendered", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const text = getByText("First order");
    expect(text).toBeInTheDocument();

});

test("the offer text is rendered - 2", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const text = getByText("20% off");
    expect(text).toBeInTheDocument();

});

test("the search bar is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const text = getByTitle("searchProduct");
    expect(text).toBeInTheDocument();

});

test("the search button is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const text = getByTitle("searchButton");
    expect(text).toBeInTheDocument();

});

test("the order-by selector is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const text = getByTitle("orderBySelector");
    expect(text).toBeInTheDocument();

});