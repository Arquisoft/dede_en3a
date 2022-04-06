import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import * as React from "react";
import ContactPage from "../components/pages/ContactPage/ContactPage";
import {db} from "../utils/firebase"
test("the contact title is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <ContactPage></ContactPage> </Provider></BrowserRouter> );
    const titleContact = getByTitle("contactTitle");
    expect(titleContact).toBeInTheDocument();

});

test("the gmail logo is rendered", async () => {

    const {getByTitle} = render( <BrowserRouter><Provider store={store}> <ContactPage></ContactPage> </Provider></BrowserRouter> );
    const contactImage = getByTitle("contactImage");
    expect(contactImage).toBeInTheDocument();

});

test("the email text is rendered", async () => {

    const {getByText} = render( <BrowserRouter><Provider store={store}> <ContactPage></ContactPage> </Provider></BrowserRouter> );
    const email = getByText("Email: dedeen3a@gmail.com");
    expect(email).toBeInTheDocument();

});