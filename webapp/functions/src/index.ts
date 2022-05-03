"use strict";

import { CallableContext } from "firebase-functions/lib/common/providers/https";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const Nominatim = require("nominatim-geocoder");
const geocoder = new Nominatim();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

async function sendEmail(
  title: string,
  email: string,
  items: any,
  address: string,
  shippingCost: number,
  productsCost: number,
  created: number,
  estimatedDelivery: number,
  orderState: string,
  info: string
) {
  const formatedCreationDate = new Date(created).toLocaleString().split(",")[0];
  const formatedEstimatedDelivery = new Date(estimatedDelivery)
    .toLocaleString()
    .split(",")[0];

  let orderItemRows = "";
  const totalAmount = productsCost + shippingCost;

  items.forEach((item: any) => {
    orderItemRows +=
      "<tr><td style='padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>" +
      item.title +
      "</td><td style='padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>" +
      item.price.toFixed(2) +
      "€ </td><td style='padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>" +
      item.amount +
      "</td><td style='padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>" +
      (item.amount * item.price).toFixed(2) +
      "€ </td></tr style='padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>";
  });

  let message: String =
    "<div style='color: white; padding: 1rem; background-color: #171717'>" +
    "<span>" +
    info +
    "</span>" +
    "<table style='border-spacing: 0px; width: 100%; background-color: rgba(255, 255, 255, 0.027);border: 1px solid rgba(255, 255, 255, 0.089); '>" +
    "  <th style='background-color: rgba(66, 66, 66, 0.514); padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>Item</th>" +
    "  <th style='background-color: rgba(66, 66, 66, 0.514); padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>Price</th>" +
    "  <th style='background-color: rgba(66, 66, 66, 0.514); padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>Quantity</th>" +
    "  <th style='background-color: rgba(66, 66, 66, 0.514); padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>Total</th>" +
    orderItemRows +
    "</table>" +
    "<div style='display:flex; background-color: rgba(255, 139, 51, 0.144);  padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>" +
    "  Shipping costs: <b style='margin-left: auto;'> " +
    shippingCost +
    " €</b>" +
    "</div>" +
    "<div style='display:flex; background-color: rgba(255, 139, 51, 0.144);  padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>" +
    "  Total: <b style='margin-left: auto;'> " +
    totalAmount +
    " €</b>" +
    "</div>" +
    "<div style='display:flex; background-color: rgba(255, 139, 51, 0.144);  padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>" +
    "  Creation date:" +
    "  <b style='margin-left: auto;'>" +
    formatedCreationDate +
    "</b>" +
    "</div>" +
    "<div style='display:flex; background-color: rgba(255, 139, 51, 0.144);  padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>" +
    "  Estimated delivery:" +
    "  <b style='margin-left: auto;'>" +
    formatedEstimatedDelivery +
    "  </b>" +
    "</div>" +
    "<div style='display:flex; background-color: rgba(255, 139, 51, 0.144);  padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>" +
    "  State: <b style='margin-left: auto;'> " +
    orderState +
    "</b>" +
    "</div>" +
    "<div style='display:flex; background-color: rgba(255, 139, 51, 0.144);  padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.089);'>" +
    "  Adress: <b style='margin-left: auto;'> " +
    address +
    "</b>" +
    "</div>" +
    "</div>";
  await admin
    .firestore()
    .collection("mail")
    .add({
      to: "" + email,
      message: {
        subject: "[Dede] " + title,
        text: "These are the details of your last order:",
        html: "" + message,
      },
    })
    .then(() => functions.logger.info("Email delivered correctly"));
}

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

//Latitud oviedo: 43.3603
//Longitud ovied: -5.84476
function distanceInKmBetweenEarthCoordinates(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

async function calculateCoordinates(
  address: string,
  postcode: string,
  mycity: string,
  country: string,
  region: string
) {
  let query: string = mycity + "," + region + "," + country + "," + postcode;
  console.log(query);
  return geocoder.search({ q: query });
}

/**
 *
 * @param distance Distance in km from the storage point to delivery adress
 * @returns The estimated delivery date in milliseconds
 */
function calculateEstimatedDelivery(distance: number) {
  const TIME_FOR_100KM = 3600000; //1hr for 1km

  const currentDateMillis = new Date().getTime();

  const deliveryTimeMillis = distance * TIME_FOR_100KM;

  const sum = currentDateMillis + deliveryTimeMillis;
  return sum;
}

export const checkOrdersState = functions
  .region("europe-west1")
  .pubsub.schedule("every 1 minutes")
  .onRun(async (context: any) => {
    await admin
      .firestore()
      .collection("orders")
      .where("state", "!=", "Delivered")
      .get()
      .then((snapshot: any) => {
        snapshot.forEach(async (doc: any) => {
          const order = doc.data();
          const difference = order.estimatedDelivery - order.created;
          const stepDif = difference / 3;
          const currentDateMillis = Date.now();
          let newState = "Being prepared";
          if (currentDateMillis >= order.created + stepDif) {
            newState = "Shipped";
          }
          if (currentDateMillis >= order.created + stepDif * 2) {
            newState = "Out for delivery";
          }
          if (currentDateMillis >= order.created + stepDif * 3) {
            newState = "Delivered";
          }
          if (order.state !== newState) {
            const updatedOrder = { ...order, state: newState };
            const message =
              "Your order status has changed from " +
              order.state +
              " to " +
              newState;

            await sendEmail(
              "Your order status has changed",
              order.userEmail,
              order.items,
              order.address,
              order.shippingCost,
              order.totalAmount,
              order.created,
              order.estimatedDelivery,
              newState,
              message
            );
            await admin
              .firestore()
              .collection("orders")
              .doc(doc.id)
              .update({ ...updatedOrder })
              .then(() => {
                console.log(
                  "Update order: " +
                    doc.id +
                    " from state " +
                    order.state +
                    " to " +
                    newState
                );
              });
          }
        });
      });
    console.log("This will be running each 5 minutes");
    return null;
  });

export const calculateDeliveryOnCall = functions
  .region("europe-west1")
  .runWith({
    // Ensure the function has enough memory and time
    // to process large files
    timeoutSeconds: 150,
    memory: "512MB",
  })
  .https.onCall(
    async (
      data: {
        address: string;
        postalcode: string;
        city: string;
        country: string;
        region: string;
      },
      context: CallableContext
    ) => {
      functions.logger.info("PRE CALC");

      let result = await calculateCoordinates(
        data.address,
        data.postalcode,
        data.city,
        data.country,
        data.region
      );

      functions.logger.info(result);
      if (result.length <= 0) {
        functions.logger.error("NO HAY RESPUESTA DE NOMINATIM");
        return new Error("Sorry, unable to locate provided address");
      }

      functions.logger.info(result);
      let distance = distanceInKmBetweenEarthCoordinates(
        43.3603,
        -5.84476,
        result[0].lat,
        result[0].lon
      );

      functions.logger.info("distance computed: " + distance);

      //1$ each 100km
      let costShi = distance / 100;

      const estimatedDelivery = calculateEstimatedDelivery(distance);

      costShi = parseFloat(costShi.toFixed(2));
      return {
        message: "Congrats, your shipping has been calculated...",
        cost: costShi,
        estimatedDelivery: estimatedDelivery,
      };
    }
  );

export const sendOrder = functions
  .region("europe-west1")
  .runWith({
    // Ensure the function has enough memory and time
    // to process large files
    timeoutSeconds: 150,
    memory: "512MB",
  })
  .https.onCall(
    async (
      data: {
        items: CartItem[];
        user: string;
        addressData: {
          address: string;
          postalcode: string;
          city: string;
          country: string;
          region: string;
        };
      },
      context: CallableContext
    ) => {
      //COMPUTING SHIPPING
      let addressData = data.addressData;
      let addressAsString =
        addressData.address +
        "," +
        addressData.city +
        "," +
        addressData.region +
        "," +
        addressData.country;
      let result = await calculateCoordinates(
        addressData.address,
        addressData.postalcode,
        addressData.city,
        addressData.country,
        addressData.region
      );

      if (result.length <= 0) {
        functions.logger.error("NO HAY RESPUESTA DE NOMINATIM");
      }
      let distance = distanceInKmBetweenEarthCoordinates(
        43.3603,
        -5.84476,
        result[0].lat,
        result[0].lon
      );
      //1$ for 100km

      const estimatedDelivery = calculateEstimatedDelivery(distance);
      let costShi = distance / 100;
      costShi = parseFloat(costShi.toFixed(2));

      ///////////////////

      functions.logger.info("Cart computed!", { structuredData: true });

      let items: {
        itemId: String;
        amount: number;
        price: number;
        img: String;
        title: string;
      }[] = [];

      var total: number = 0;
      let stockError = "";
      data.items.forEach((item) => {
        if (item.amount > item.product.stock!) {
          stockError = "Cant buy more products than available";
        }
        if (item.amount > 0 && item.product.id != null) {
          items.push({
            itemId: item.product.id,
            amount: item.amount,
            price: item.product.price,
            img: item.product.img,
            title: item.product.title,
          });

          total = total + item.amount * item.product.price;
          functions.logger.info("Total: " + total);
        }
      });
      if (stockError) {
        console.log("ERROR IN STOCK PROCESSING");
        return new functions.https.HttpsError("aborted", "Cant buy");
      }

      if (total <= 0) {
        return new Error("Sorry, cannot perform an empty order :(");
      }

      functions.logger.info(await admin.firestore().listCollections());
      const orders = await admin.firestore().collection("orders");

      //const orders = collection(db, "orders");

      functions.logger.info("Tipo doc:" + orders.type);
      functions.logger.info("Antes del add");
      const created = Date.now();
      await orders
        .add({
          created: created,
          userEmail: data.user,
          items: items,
          address: addressAsString,
          shippingCost: costShi,
          totalAmount: total + costShi,
          estimatedDelivery: estimatedDelivery,
          state: "Being prepared",
        })
        .then(async () => {
          functions.logger.info("Doc saved ");
          await decreaseProductsStock(data.items);
          await sendEmail(
            "Your order has been processed",
            data.user,
            items,
            data.addressData.address,
            costShi,
            total,
            created,
            estimatedDelivery,
            "Being prepared",
            "Your order has been processed. You will be notified when on shipping state changes."
          );
          return {
            message: "Congrats, your order has been saved...",
            status: 200,
          };
        })
        .catch((err: Error) => {
          functions.logger.info("Doc NOT saved ");

          return new Error(
            "Sorry, unable to register your order, please try again later"
          );
        });

      return {
        message: "Congrats, your order has been saved...",
        status: 200,
      };
    }
  );

async function decreaseProductsStock(items: CartItem[]) {
  if (items) {
    items.forEach(async (item) => {
      if (item) {
        const currentStock = item.product.stock!;
        const newStock = currentStock - item.amount;
        console.log(
          "Reducing stock to product " +
            item.product.name +
            " from " +
            currentStock +
            " to " +
            newStock
        );

        await admin
          .firestore()
          .collection("products")
          .doc(item.product.id)
          .update({ stock: newStock })
          .then(() => {
            console.log(
              item.product.name +
                " product stock reduced from " +
                currentStock +
                " to " +
                newStock
            );
          })
          .catch((error: any) => {
            console.error("Error reducing product stock: ", error);
          });
      }
    });
  } else {
    console.error("Tried to decrease stock of empty order");
  }
}

interface Product {
  id: string;
  category?: string;
  description?: string;
  img: string;
  price: number;
  title: string;
  name?: string;
  stock?: number;
}

interface CartItem {
  product: Product;
  amount: number;
}
