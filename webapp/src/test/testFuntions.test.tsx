import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import ContactPage from "../components/pages/ContactPage/ContactPage";
import * as React from "react";
import {sendOrder} from "./copyOfFunctions/copyOfFunctions"

test("an order is executed", async () => {

    let products : {product: {
            id: string,
            category?: string,
            description?: string,
            img: string,
            price: number,
            title: string,
            name?: string},
        amount: number}[] ;

    products = [];
    products.push( { product:  {
            id:'8ZIZkdsnZYUnf5PfOKCF',
            img: 'f',
            price: 1.5,
            title:'sanitizer'
        },
        amount: 3
    })

    products.push( { product:  {
            id:'O1NV14ZbgE9Irs1rOGHE',
            img: 'f',
            price: 0.15,
            title:'mask'
        },
        amount: 2
    })



    let response = await sendOrder( {
        items: products,

            user:"test@test.com",
            addressData:{
            address: "C/Paseo de S. Fco. de Sales",
                postalcode: "28003",
                city : "Madrid",
                country: "España",
                region: "Madrid"
        } } );

    const expected = {
        message:"Congrats, your order has been saved...",
        status:200

    };

    console.log(response)

    expect(response.status).toBe(200);




});