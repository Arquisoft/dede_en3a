import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { User } from "./model/user";

const userCollection = collection(db, "user");

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
