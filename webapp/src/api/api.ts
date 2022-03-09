import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { User } from "./model/user";
import { Product } from "./model/product";

const userCollection = collection(db, "user");
const productCollection = collection(db, "products")

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
