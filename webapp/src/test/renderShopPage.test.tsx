import {getByRole, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import Login from "../components/pages/LoginPage/LoginPage";
import * as React from "react";
import {Shop} from "@mui/icons-material";
import ShopPage from "../components/pages/shopPage/ShopPage";

test("the Shop title is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const shopTitle = getByTitle("ShopTitle");
    expect(shopTitle).toBeInTheDocument();

});

test("the Shop subtitle is rendered", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const shopSubtitle = getByText("Life is hard enough already. Let us make it a little easier.");
    expect(shopSubtitle).toBeInTheDocument();

});

test("the card products are rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <ShopPage></ShopPage></Provider></BrowserRouter> );
    const shopSubtitle = getByTitle("products");
    expect(shopSubtitle).toBeInTheDocument();

});
