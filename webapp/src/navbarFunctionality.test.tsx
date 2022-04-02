import {fireEvent, render} from "@testing-library/react";
import * as React from "react";
import TopMenu from "./components/menu/TopMenu";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {BrowserRouter} from "react-router-dom";

test ( 'Navbar home test', async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const homeButton = getByText("Home");
    fireEvent.click(homeButton);
    expect(getByText("Home")).toBeInTheDocument();

} );

test ( 'Navbar shop test', async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const shopButton = getByText("Shop");
    fireEvent.click(shopButton);
    expect(getByText("Shop")).toBeInTheDocument();

} );

test ( 'Navbar about us test', async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <TopMenu></TopMenu></Provider></BrowserRouter> );
    const aboutUsButton = getByText("About us");
    fireEvent.click(aboutUsButton);
    expect(getByText("About us")).toBeInTheDocument();

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