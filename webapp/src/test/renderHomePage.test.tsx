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
    const subtitle = getByText("A decentralized ecommerce website.");
    expect(subtitle).toBeInTheDocument();

});

test("the main text of the page is rendered", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <MainPage></MainPage></Provider></BrowserRouter> );
    const text = getByText("Innovational use of Solid Pods in order to make our deliveries more private.");
    expect(text).toBeInTheDocument();

});