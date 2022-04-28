import {Comments} from "./comments";

export interface Product {
  id: string;
  category?: string;
  description?: string;
  img: string;
  price: number;
  title: string;
  name?: string;
  comments?: Comments[];
  stock?: number;
}
