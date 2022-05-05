import reducer, { initialStore } from "./reducer";
import { createStore, Store, applyMiddleware } from "redux";
import { CartItem } from "./models/CartItem";
import thunk from "redux-thunk";

export type DedeAction = {
  type: string;
  props: any;
};

export const saveState = (state: DedeStore) => {
  try {
    let serializedState = JSON.stringify(state);
    localStorage.setItem("dede:state", serializedState);
  } catch (err) {
    console.log("Error saving state", err);
  }
};

export const loadState = () => {
  try {
    let serializedState = localStorage.getItem("dede:state");

    if (serializedState === null) {
      return initialStore;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.log("Error loading state", err);
    return initialStore;
  }
};

export type DedeStore = {
  cart: CartItem[];
  shippingCost: number | null;
  estimatedDelivery: number | null;
};

type DispatchType = (args: DedeAction) => DedeAction;

export const store: Store<DedeStore, DedeAction> & {
  dispatch: DispatchType;
} = createStore(reducer, loadState(), applyMiddleware(thunk));
