import { CollectionReference, Query } from "firebase/firestore";
import { Filter } from "../api/model/filter";
import { CartItem } from "../redux/models/CartItem";

export class Utils {
  static calculateTotal = (items: CartItem[]) => {
    console.log("recalculate");
    return items.reduce(
      (ack: number, item) => ack + item.product.price! * item.amount,
      0
    ); //+ item.price
  };
}
