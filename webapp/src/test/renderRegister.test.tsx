import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import * as React from "react";
import {RegisterPage} from "../components/pages/RegisterPage/RegisterPage";

test("the register button is rendered", async () => {

    const {getByRole} = render( <BrowserRouter><Provider store={store}> <RegisterPage onExit={()=>null}></RegisterPage> </Provider></BrowserRouter> );
    const registerButton = getByRole("button");
    expect(registerButton).toBeInTheDocument();

});

test("the register title is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <RegisterPage onExit={()=>null}></RegisterPage> </Provider></BrowserRouter> );
    const registerTitle = getByTitle("registerTitle");
    expect(registerTitle).toBeInTheDocument();

});

test("the email label is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <RegisterPage onExit={()=>null}></RegisterPage> </Provider></BrowserRouter> );
    const emailLabel = getByTitle("emailLabel");
    expect(emailLabel).toBeInTheDocument();

});

test("the name label is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <RegisterPage onExit={()=>null}></RegisterPage> </Provider></BrowserRouter> );
    const nameLabel = getByTitle("nameLabel");
    expect(nameLabel).toBeInTheDocument();

});

test("the password label is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <RegisterPage onExit={()=>null}></RegisterPage> </Provider></BrowserRouter> );
    const passLabel = getByTitle("passwordLabel");
    expect(passLabel).toBeInTheDocument();

});

test("the repeated password label is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <RegisterPage onExit={()=>null}></RegisterPage> </Provider></BrowserRouter> );
    const confirmLabel = getByTitle("confirmLabel");
    expect(confirmLabel).toBeInTheDocument();

});

test("the email input is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <RegisterPage onExit={()=>null}></RegisterPage> </Provider></BrowserRouter> );
    const emailInput = getByTitle("emailInput");
    expect(emailInput).toBeInTheDocument();

});

test("the name input is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <RegisterPage onExit={()=>null}></RegisterPage> </Provider></BrowserRouter> );
    const nameInput = getByTitle("nameInput");
    expect(nameInput).toBeInTheDocument();

});

test("the password input is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <RegisterPage onExit={()=>null}></RegisterPage> </Provider></BrowserRouter> );
    const passInput = getByTitle("passwordInput");
    expect(passInput).toBeInTheDocument();

});

test("the repeated password input is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <RegisterPage onExit={()=>null}></RegisterPage> </Provider></BrowserRouter> );
    const confirmInput = getByTitle("confirmInput");
    expect(confirmInput).toBeInTheDocument();

});