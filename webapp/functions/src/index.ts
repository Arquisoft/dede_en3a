
"use strict";

import {CallableContext} from "firebase-functions/lib/common/providers/https";

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();



// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//


export const sendOrder = functions
    .region('us-central1')
    .https
    .onCall(async (data : {
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


                total = total + (item.amount * item.product.price);
                functions.logger.info("Total: " + total);
            }
        });


        functions.logger.info(await admin.firestore().listCollections());
        const orders = await  admin.firestore().collection('orders');

        //const orders = collection(db, "orders");

        functions.logger.info("Tipo doc:" + orders.type);
        functions.logger.info("Antes del add");
        await orders.add( {
            created: Date.now(),
            userEmail:data.user,
            items:items,
            address:data.address,
            totalAmount:total

        })
            .then(()=>{
                functions.logger.info("Doc saved ");
                return {
                    message: "Congrats, your order has been saved...",
                    status:200
                };

            })
            .catch((err : Error)=>{
                functions.logger.info("Doc NOT saved ");

                return new Error("Sorry, unable to register your order, please try again later");


            })

    });
