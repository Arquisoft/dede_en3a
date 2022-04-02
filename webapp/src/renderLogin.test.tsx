import {fireEvent, render} from "@testing-library/react";
import * as React from "react";
import Login from "./components/pages/LoginPage/LoginPage";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";

test("the login button is rendered", async () => {

    const {getByRole} = render( <BrowserRouter><Provider store={store}> <Login></Login></Provider></BrowserRouter> );
    const loginButton = getByRole("button");
    expect(loginButton).toBeInTheDocument();

});

test("the email input is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <Login></Login></Provider></BrowserRouter> );
    const emailInput = getByTitle("email");
    expect(emailInput).toBeInTheDocument();

});

test("the password input is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <Login></Login></Provider></BrowserRouter> );
    const passwordInput = getByTitle("password");
    expect(passwordInput).toBeInTheDocument();

});

test("the register link is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <Login></Login></Provider></BrowserRouter> );
    const registerLink = getByTitle("register");
    expect(registerLink).toBeInTheDocument();

});

test("the logout link is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <Login></Login></Provider></BrowserRouter> );
    const logoutLink = getByTitle("register");
    expect(logoutLink).toBeInTheDocument();

});

/*
test("Login with a valid account", async () => {

    const {getByTitle} = render( <Provider store={store}> <Login></Login></Provider> );
    const loginButton = getByTitle("loggin");

    const email = getByTitle("email");
    const password = getByTitle("password");

    fireEvent.change( email!, {target:{value:"123@123.com"}} );
    fireEvent.change( password!, {target:{value:"123123"}} );

    fireEvent.click(loginButton);

    if(useAuth().getCurrentUser() === null){ expect( email ).toBeInTheDocument() };

});*/