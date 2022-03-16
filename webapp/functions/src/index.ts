
"use strict";

import {CallableContext} from "firebase-functions/lib/common/providers/https";

const functions = require('firebase-functions');
const addDoc = require( "@firebase/firestore");
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//


export const sendOrder = functions
    .region('us-central1')
    .https
    .onCall((data : {
        items:
            {product: {
                    id: string,
                    category?: string,
                    description?: string,
                    img: string,
                    price: number,
                    title: string,
                    name?: string},
                amount: number}[],
        user:String,
        address:String }, context:CallableContext) => {
        functions.logger.info("Cart computed!", {structuredData: true});

        let items : {itemId:String,amount:number,price:number,img:String,title:string}[] = [];

        var total: number = 0;

        data.items.forEach((item)=>{
            if(item.amount > 0 && item.product.id != null){

                items.push({


                    itemId: item.product.id,
                    amount:item.amount,
                    price:item.product.price,
                    img:item.product.img,
                    title:item.product.title


                });


                total += item.amount * item.product.price;
                functions.logger.info("Total: " + total);
            }
        });

        const orders = db.collection('orders')



        addDoc( orders, {
            created: Date.now(),
            userEmail:data.user,
            items:items,
            address:data.address,
            totalAmount:total

        })
            .then(()=>{
                return {
                    message: "Congrats, your order has been saved...",
                    status:200
                };

            })
            .catch((err : Error)=>{

                return new Error("Sorry, unable to register your order, please try again later");


            })

    });
