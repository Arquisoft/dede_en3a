import reducer from "./reducer";
import { createStore, Store, applyMiddleware } from "redux";
import { CartItem } from "./models/CartItem";
import thunk from "redux-thunk";
const initialStore = {
  cart: [],
};

export type DedeAction = {
  type: string;
  props: any;
};

export type DedeStore = {
  cart: CartItem[];
  shippingCost: number | null;
};

type DispatchType = (args: DedeAction) => DedeAction;

export const store: Store<DedeStore, DedeAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));
