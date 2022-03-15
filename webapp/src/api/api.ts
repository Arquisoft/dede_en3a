import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { User } from "./model/user";
import { Product } from "./model/product";
import {OrderInd} from "./model/orders/orderInd";
import {Order} from "./model/orders/order";
import {query, where} from "firebase/firestore";

const userCollection = collection(db, "user");
const productCollection = collection(db, "products")
const orderCollection = collection(db, "orders")

export async function addUser(user: User): Promise<any> {
  return addDoc(userCollection, {
    created: Date.now(),
    ...user,
  });
}

//test
export async function getUsers(): Promise<any> {
  return getDocs(userCollection).then((docs) =>
      docs.docs.map((doc) => doc.data() as User)
  );

}

export async function addProduct(product: Product): Promise<any> {
    return addDoc(productCollection, {
        ...product
    });
}

export async function getProducts(): Promise<any> {
    return getDocs(productCollection).then((docs) =>
        docs.docs.map((doc) => doc.data() as Product)
    );
}

export async function addOrder(order: Order): Promise<any> {
    return addDoc(orderCollection, {
        ...order
    });
}

export async function getOrder(email : string | null | undefined): Promise<any> {
    if(email != null && email != undefined){
        const q = query(orderCollection, where("userEmail", "==", email));
        return getDocs(q).then((docs) =>
            docs.docs.map((doc) => doc.data() as Order)
        );
    }
    return null;
}
