import {CartItem} from "./models/CartItem";
import * as actionTypes from "./actionTypes";

export function increase(item: CartItem) {
    return {
        type: actionTypes.INCREASE,
        payload: item,
    }
}
export function decrease(item: CartItem) {
    return {
        type: actionTypes.DECREASE,
        payload: item,
    }
}
export function remove(item: CartItem) {
    return {
        type:  actionTypes.REMOVE,
        payload: item,
    }
}
export function clearCart(item: CartItem) {
    return {
        type:  actionTypes.CLEAR_CART,
        payload: item,
    }
}
export function getTotals(item: CartItem) {
    return {
        type:  actionTypes.GET_TOTALS,
        payload: item,
    }
}

