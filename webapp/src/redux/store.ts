import reducer from './reducer';
import { createStore, Store } from 'redux';
import {CartItem} from "./models/CartItem";

const initialStore = {
    cart: [] ,
}

export type DedeAction = {
    type: string,
    props: any
}

export type DedeStore = {
    cart: CartItem[]
}

type DispatchType = (args: DedeAction) => DedeAction;

export const store: Store<DedeStore, DedeAction> & {
    dispatch: DispatchType
} = createStore(reducer, initialStore)
