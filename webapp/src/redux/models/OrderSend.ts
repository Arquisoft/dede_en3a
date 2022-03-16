import {CartItem} from "./CartItem";

export interface OrderSend{

    items:CartItem[],
    user:String,
    address:String

}