import createAction from 'redux';
import {CartItem} from "./models/CartItem";

export const INCREASE = { type: 'INCREASE', payload : 'todo' }
export const DECREASE = { type: 'INCREASE' }
export const REMOVE = { type: 'REMOVE' }
export const CLEAR_CART = { type: 'CLEAR_CART' }
export const GET_TOTALS = { type: 'GET_TOTALS' }

function increase(item: CartItem) {
    return {
        type: INCREASE,
        payload: item,
    }
}
