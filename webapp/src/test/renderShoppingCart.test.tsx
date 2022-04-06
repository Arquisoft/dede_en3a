import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import * as React from "react";
import Cart from "../components/Cart/Cart";
import {db} from "../utils/firebase"
test("the cart title is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <Cart></Cart> </Provider></BrowserRouter> );
    const shoppingCartTitle = getByTitle("shoppingCartTitle");
    expect( shoppingCartTitle ).toBeInTheDocument();

});

test("the total amount of money is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <Cart></Cart> </Provider></BrowserRouter> );
    const totalAmount = getByTitle("total");
    expect( totalAmount ).toBeInTheDocument();

});

test("the POD information is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <Cart></Cart> </Provider></BrowserRouter> );
    const podInfo = getByTitle("podHeader");
    expect( podInfo ).toBeInTheDocument();

});

test("the POD information is rendered - 2", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <Cart></Cart> </Provider></BrowserRouter> );
    const podInfo = getByTitle("getPOD");
    expect( podInfo ).toBeInTheDocument();

});
