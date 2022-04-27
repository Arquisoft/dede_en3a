import {fireEvent, render} from "@testing-library/react";
import * as React from "react";
import TopMenu from "../components/menu/TopMenu";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import {BrowserRouter} from "react-router-dom";
import {db} from "../utils/firebase"
test ( 'Navbar home test', async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const homeButton = getByTitle("home");
    expect(homeButton).toBeInTheDocument();

} );

test ( 'Navbar shop test', async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const shopButton = getByTitle("shop");
    expect(shopButton).toBeInTheDocument();

} );

test ( 'Navbar about us test', async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const aboutUsButton = getByTitle("about");
    expect(aboutUsButton).toBeInTheDocument();

} );


test ( 'Navbar Contact test', async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const contactButton = getByTitle("contact");
    expect(contactButton).toBeInTheDocument();

} );

test ( 'Navbar Order test', async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const ordersButton = getByTitle("orders");
    expect(ordersButton).toBeInTheDocument();

} );

test ( 'Navbar Cart test', async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const cartButton = getByTitle("cart");
    expect(cartButton).toBeInTheDocument();

} );

test ( 'Navbar Login test', async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const loginButton = getByTitle("login-pc");
    expect(loginButton).toBeInTheDocument();

} );