import {
  addDoc,
  collection,
  getDocs,
  setDoc,
    deleteDoc,
  doc,
  CollectionReference,
  Query,
  WhereFilterOp,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { User } from "./model/user";
import { Product } from "./model/product";
import { OrderInd } from "./model/orders/orderInd";
import { Order } from "./model/orders/order";
import { query, where } from "firebase/firestore";
import { auth } from "../utils/firebase";
import firebase from "firebase/compat";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { Comments } from "./model/comments";
import { Filter } from "./model/filter";

const userCollection = collection(db, "user");
const productCollection = collection(db, "products");
const orderCollection = collection(db, "orders");
const adminCollection = collection(db, "admin");

export async function signUpUser(
  auth: Auth,
  email: string,
  password: string
): Promise<UserCredential> {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function logInUser(
  auth: Auth,
  email: string,
  password: string
): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password);
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

export async function updateProduct(product: Product): Promise<any> {
  return setDoc(doc(db, "products", product.id), {
    ...product,
  });
}

export async function addProduct(product: Product): Promise<any> {
  return addDoc(productCollection, {
    ...product,
  });
}

export async function removeProduct(id : string){
  await deleteDoc(doc(db,"products", id));
}

export async function getProducts(filters?: Filter[]): Promise<any> {
  if (filters) {
    const query = applyFilters(productCollection, filters);
    return getDocs(query).then((docs) =>
      docs.docs.map((doc) => doc.data() as Product)
    );
  }

  return getDocs(productCollection).then((docs) =>
    docs.docs.map((doc) => doc.data() as Product)
  );
}

export async function addAdmin(email: string, name : string): Promise<any> {
  return setDoc(doc(db, "admin", email), {
    email,
    name
  });
}

export async function removeAdmin(email : string){
  await deleteDoc(doc(db,"admin", email));
}

export async function addOrder(order: Order): Promise<any> {
  return addDoc(orderCollection, {
    ...order,
  });
}

export async function getOrders(filters?: Filter[]): Promise<any> {
  if (filters) {
    const query = applyFilters(orderCollection, filters);
    return getDocs(query).then((docs) =>
        docs.docs.map((doc) => doc.data() as Order)
    );
  }

  return getDocs(orderCollection).then((docs) =>
      docs.docs.map((doc) => doc.data() as Order)
  );
}

export async function getOrder(email: string | null | undefined): Promise<any> {
  if (email != null && email != undefined) {
    const q = query(orderCollection, where("userEmail", "==", email));
    return getDocs(q).then((docs) =>
      docs.docs.map((doc) => doc.data() as Order)
    );
  }
  return null;
}

export async function getAdmin(email: string | null | undefined): Promise<any> {
  if (email != null && email != undefined) {
    const q = query(adminCollection, where("email", "==", email));
    return getDocs(q).then((docs) =>
        docs.docs.map((doc) => doc.data() as User)[0]
    );
  }
  return null;
}

const applyFilters = (q: CollectionReference<any>, filters?: Filter[]) => {
  if (!filters) return q;
  let queries: Query<any> = q;
  filters.forEach((filter) => {
    if (filter.comparison === "contains") {
      queries = query(queries, where(filter.property, ">=", filter.value));
      queries = query(
        queries,
        where(filter.property, "<=", filter.value + "\uf8ff")
      );
    } else {
      queries = query(
        queries,
        where(filter.property, filter.comparison as WhereFilterOp, filter.value)
      );
    }
  });
  return queries;
};

export async function getProductById(
  id: string | null | undefined
): Promise<any> {
  if (id != null && id != undefined) {
    const q = query(productCollection, where("id", "==", id));
    return getDocs(q).then((docs) =>
      docs.docs.map((doc) => doc.data() as Product)
    );
  }
  return null;
}

export async function getUsersByEmail(
  email: string | null | undefined
): Promise<any> {
  if (email != null && email != undefined) {
    const q = query(userCollection, where("email", "==", email));
    return getDocs(q).then((docs) =>
      docs.docs.map((doc) => doc.data() as User)
    );
  }
}
