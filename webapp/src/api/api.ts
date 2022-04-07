import { addDoc, collection, getDocs, setDoc,doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { User } from "./model/user";
import { Product } from "./model/product";
import {OrderInd} from "./model/orders/orderInd";
import {Order} from "./model/orders/order";
import {query, where} from "firebase/firestore";
import {auth} from '../utils/firebase';
import firebase from "firebase/compat";
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential} from 'firebase/auth';
import {Comments} from "./model/comments";


const userCollection = collection(db, "user");
const productCollection = collection(db, "products")
const orderCollection = collection(db, "orders")


export async function signUpUser(auth:Auth, email:string,password:string) : Promise<UserCredential>{
    return await createUserWithEmailAndPassword(auth,email,password);
}


export async function logInUser(auth:Auth, email:string,password:string) : Promise<UserCredential>{
    return await signInWithEmailAndPassword(auth,email,password);
}

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

export async function updateProduct(product : Product): Promise<any>{
    return setDoc(doc(db,"products",product.id) , {
        ...product
    });

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

export async function getProductById(id : string | null | undefined): Promise<any> {
    if(id != null && id != undefined){
        const q = query(productCollection, where("id", "==", id));
        return getDocs(q).then((docs) =>
            docs.docs.map((doc) => doc.data() as Product)
        );
    }
    return null;
}

export async function getUsersByEmail(email : string | null | undefined): Promise<any> {
    if(email != null && email != undefined){
        const q = query(userCollection, where("email", "==", email));
        return getDocs(q).then((docs) =>
            docs.docs.map((doc) => doc.data() as User)
        );
    }
}