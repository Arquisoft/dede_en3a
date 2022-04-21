"use strict";

import {CallableContext} from "firebase-functions/lib/common/providers/https";

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();


const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

function sendEmail(email: String,
                   data: {
                       items:
                           {
                               product: {
                                   id: string,
                                   category?: string,
                                   description?: string,
                                   img: string,
                                   price: number,
                                   title: string,
                                   name?: string
                               },
                               amount: number
                           }[],
                       user: String,
                       addressData: {
                           address: string,
                           postalcode: string,
                           city: string,
                           country: string,
                           region: string
                       }
                   }
                   ,shippingCost : number,
                   productsCost : number) {


    let message: String =
        "<table >\n" +
            "<tr >\n" +
                "<th>PRODUCT</th>\n" +

                "<th >PRICE</th>\n" +
                "<th >UNITS</th>\n" +
            "</tr>\n";

        let totalProd : number = 0;

        let allItems = data.items;
        while(totalProd < allItems.length){



            message += "<tr>\n" +
                            "<td >" + allItems[totalProd].product.title +"</td>\n" +
                            "<td >" + allItems[totalProd].product.price + "</td>\n" +
                            "<td >" + allItems[totalProd].amount + "</td>\n" +
                        "</tr>\n";
            totalProd++;
        }

        message += "</table><br>";
        message += "<p>Total cost of products: " + productsCost + "€</p><br>";
        message += "<p>Shiping to: " +
            data.addressData.address + " , " +
            data.addressData.city + " , " +
            data.addressData.postalcode + " , " +
            data.addressData.region + " , " +
            data.addressData.country;
        message += "<p>Total cost of shiping: " + shippingCost + "€</p>";
        message += "<p>Total cost of order: " + (productsCost+shippingCost) + "€</p>";



    admin
        .firestore()
        .collection("mail")
        .add({
            to: "" + email,
            message: {
                subject: "Your order has been processed.",
                text: "These are the details of your last order:",
                html: ""+message,
            },
        })
        .then(() => functions.logger.info("Email delivered correctly"));

}


function degreesToRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

//Latitud oviedo: 43.3603
//Longitud ovied: -5.84476
function distanceInKmBetweenEarthCoordinates(lat1: number, lon1: number, lat2: number, lon2: number) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}

async function calculateCoordinates(address: string, postcode: string, mycity: string, country: string, region: string) {


    let query: string = mycity + ',' + region + ',' + country + ',' + postcode;
    console.log(query)
    return geocoder.search({q: query})


}


export const calculateDeliveryOnCall = functions
    .region("us-central1")
    .runWith({
        // Ensure the function has enough memory and time
        // to process large files
        timeoutSeconds: 150,
        memory: "512MB",
    })
    .https
    .onCall(async (
            data: {
                address: string,
                postalcode: string,
                city: string,
                country: string,
                region: string
            },
            context: CallableContext) => {


            functions.logger.info("PRE CALC");

            let result = await calculateCoordinates(data.address, data.postalcode, data.city, data.country, data.region);

            functions.logger.info(result);
            if (result.length <= 0) {
                functions.logger.error("NO HAY RESPUESTA DE NOMINATIM")
                return new Error("Sorry, unable to locate provided address");
            }

            functions.logger.info(result);
            let distance = distanceInKmBetweenEarthCoordinates(43.3603, -5.84476, result[0].lat, result[0].lon);


            functions.logger.info("distance computed: " + distance);

            //1$ each 100km
            let costShi = (distance / 100);
            costShi = parseFloat(costShi.toFixed(2));
            return {
                message: "Congrats, your shipping has been calculated...",
                cost: costShi
            };


        }
    );


export const sendOrder = functions
    .region('us-central1')
    .runWith({
        // Ensure the function has enough memory and time
        // to process large files
        timeoutSeconds: 150,
        memory: "512MB",
    })
    .https
    .onCall(async (data: {
        items:
            {
                product: {
                    id: string,
                    category?: string,
                    description?: string,
                    img: string,
                    price: number,
                    title: string,
                    name?: string
                },
                amount: number
            }[],
        user: String,
        addressData: {
            address: string,
            postalcode: string,
            city: string,
            country: string,
            region: string
        }
    }, context: CallableContext) => {


        //COMPUTING SHIPPING
        let addressData = data.addressData;
        let addressAsString = addressData.address + "," + addressData.city + ","
            + addressData.region + "," + addressData.country;
        let result = await calculateCoordinates(addressData.address, addressData.postalcode,
            addressData.city, addressData.country, addressData.region);


        if (result.length <= 0) {
            functions.logger.error("NO HAY RESPUESTA DE NOMINATIM")
        }
        let distance = distanceInKmBetweenEarthCoordinates(43.3603, -5.84476, result[0].lat, result[0].lon);
        //1$ for 100km
        let costShi = (distance / 100);
        costShi = parseFloat(costShi.toFixed(2));


        ///////////////////


        functions.logger.info("Cart computed!", {structuredData: true});

        let items: { itemId: String, amount: number, price: number, img: String, title: string }[] = [];

        var total: number = 0;

        data.items.forEach((item) => {
            if (item.amount > 0 && item.product.id != null) {

                items.push({


                    itemId: item.product.id,
                    amount: item.amount,
                    price: item.product.price,
                    img: item.product.img,
                    title: item.product.title


                });


                total = total + (item.amount * item.product.price);
                functions.logger.info("Total: " + total);
            }
        });

        if (total <= 0) {
            return new Error("Sorry, cannot perform an empty order :(");
        }

        functions.logger.info(await admin.firestore().listCollections());
        const orders = await admin.firestore().collection('orders');

        //const orders = collection(db, "orders");

        functions.logger.info("Tipo doc:" + orders.type);
        functions.logger.info("Antes del add");
        await orders.add({
            created: Date.now(),
            userEmail: data.user,
            items: items,
            address: addressAsString,
            shippingCost: costShi,
            totalAmount: total + costShi

        })
            .then(() => {
                functions.logger.info("Doc saved ");
                sendEmail(data.user, data, costShi, total);
                return {
                    message: "Congrats, your order has been saved...",
                    status: 200
                };

            })
            .catch((err: Error) => {
                functions.logger.info("Doc NOT saved ");

                return new Error("Sorry, unable to register your order, please try again later");


            })

        return {
            message: "Congrats, your order has been saved...",
            status: 200
        };

    });
