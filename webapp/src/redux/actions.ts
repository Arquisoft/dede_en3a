import {CartItem} from "./models/CartItem";
import * as actionTypes from "./actionTypes";
import {Product} from "../api/model/product";

export function increase(item: Product) {
    return {
        type: actionTypes.INCREASE,
        payload: item,
    }
}
export function decrease(item: Product) {
    return {
        type: actionTypes.DECREASE,
        payload: item,
    }
}
export function remove(item: Product) {
    return {
        type:  actionTypes.REMOVE,
        payload: item,
    }
}
export function clearCart(item: Product) {
    return {
        type:  actionTypes.CLEAR_CART,
        payload: item,
    }
}
export function getTotals(item: Product) {
    return {
        type:  actionTypes.GET_TOTALS,
        payload: item,
    }
}

