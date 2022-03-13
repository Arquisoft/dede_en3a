import { Product } from "../../api/model/product";

export interface CartItem {
  product: Product;
  amount: number;
}
