import {fireEvent, render} from "@testing-library/react";
import * as React from "react";
import TopMenu from "../components/menu/TopMenu";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import {BrowserRouter} from "react-router-dom";

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

    const {getByText} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const contactButton = getByText("Contact");
    fireEvent.click(contactButton);
    expect(getByText("Contact")).toBeInTheDocument();

} );

test ( 'Navbar Order test', async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const ordersButton = getByText("Orders");
    fireEvent.click(ordersButton);
    expect(getByText("Orders")).toBeInTheDocument();

} );

test ( 'Navbar Cart test', async () => {

    const {getByTitle, getByText} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const cartButton = getByTitle("cart");
    fireEvent.click(cartButton);
    expect(cartButton).toBeInTheDocument();

} );