import reducer from './reducer';
import { createStore } from 'redux';
import {CartItem} from "./models/CartItem";

const initialStore = {
    cart: [] ,
    amount: 0,
    total: 0
}

export interface Store {
    cart: CartItem[]
}

export const store = createStore(reducer, initialStore);