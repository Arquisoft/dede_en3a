import { CollectionReference, Query } from "firebase/firestore";
import { Filter } from "../api/model/filter";
import { Product } from "../api/model/product";
import { CartItem } from "../redux/models/CartItem";

export class Utils {
  static calculateTotal = (items: CartItem[], shippingCost?: number | null) => {
    console.log("recalculate total cart");
    let total = items.reduce(
      (ack: number, item) => ack + item.product.price! * item.amount,
      0
    ); //+ item.price

    if (shippingCost) {
      total += shippingCost;
    }
    return total;
  };

  static getProductAverageRating = (product: Product) => {
    const ratings = product?.comments?.map((p) => p.rating);
    const sum = ratings?.reduce((a, b) => a + b, 0);
    return ratings === undefined ? 0 : sum! / ratings!.length || 0;
  };
}
