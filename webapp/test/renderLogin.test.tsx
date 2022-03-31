import {fireEvent, render} from "@testing-library/react";
import * as React from "react";
import Login from "../src/components/pages/LoginPage/LoginPage";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../src/redux/store";
import {useAuth} from "../src/context/AuthContext";

test("the login page is rendered", async () => {

    const {getByRole} = render( <BrowserRouter><Provider store={store}> <Login></Login></Provider></BrowserRouter> );
    const loginButton = getByRole("button");
    expect(loginButton).toBeInTheDocument();

});

test("Login with a valid account", async () => {

    const {getByRole, getByTitle} = render( <BrowserRouter><Provider store={store}> <Login></Login></Provider></BrowserRouter> );
    const loginButton = getByTitle("loggin");

    const email = getByTitle("email");
    const password = getByTitle("password");

    fireEvent.change( email!, {target:{value:"123@123.com"}} );
    fireEvent.change( password!, {target:{value:"123123"}} );

    fireEvent.click(loginButton);

    if(useAuth().getCurrentUser() === null){ expect( email ).toBeInTheDocument() };

});