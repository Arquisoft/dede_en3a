import {render} from "@testing-library/react";
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import MainPage from "../components/pages/mainPage/MainPage";
import {db} from "../utils/firebase"
test("the Dede title is rendered", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <MainPage></MainPage></Provider></BrowserRouter> );
    const titleDede = getByText("Dede");
    expect(titleDede).toBeInTheDocument();

});


test("the subtitle is rendered", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <MainPage></MainPage></Provider></BrowserRouter> );
    const subtitle = getByText(", a decentralized ecommerce website");
    expect(subtitle).toBeInTheDocument();

});

test("the main text of the page is rendered", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <MainPage></MainPage></Provider></BrowserRouter> );
    const text = getByText("Innovational use of Solid Pods in order to make our deliveries more private.");
    expect(text).toBeInTheDocument();

});

test("See more information", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <MainPage></MainPage></Provider></BrowserRouter> );
    const text = getByText("See more");
    expect(text).toBeInTheDocument();

});

test("Information block title is rendered", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <MainPage></MainPage></Provider></BrowserRouter> );
    const text = getByText("How does it work?");
    expect(text).toBeInTheDocument();

});

test("Choose product - title", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <MainPage></MainPage></Provider></BrowserRouter> );
    const text = getByText("First,");
    expect(text).toBeInTheDocument();

});


test("Choose product - body", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <MainPage></MainPage></Provider></BrowserRouter> );
    const text = getByText("Choose between our wide array of available products, from" +
        " medical items to technological gadgets. Once you have found your" +
        " desired products, proceed to checkout.");
    expect(text).toBeInTheDocument();

});

test("Use your POD - title", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <MainPage></MainPage></Provider></BrowserRouter> );
    const text = getByText("Then,");
    expect(text).toBeInTheDocument();

});

test("Use your POD - body", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <MainPage></MainPage></Provider></BrowserRouter> );
    const text = getByText("In order to proceed with the checkout, you will have to" +
        " introduce your solid POD WebId. If you dont have one you can" +
        " create one here?. We support solid community pods???");
    expect(text).toBeInTheDocument();

});

test("Select address - title", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <MainPage></MainPage></Provider></BrowserRouter> );
    const text = getByText("Lastly,");
    expect(text).toBeInTheDocument();

});

test("Select address - body", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <MainPage></MainPage></Provider></BrowserRouter> );
    const text = getByText("All of your personal data will be contained inside your pod(?)." +
        " You can choose your adress and proceed with the");
    expect(text).toBeInTheDocument();

});