import { INCREASE, DECREASE, REMOVE, CLEAR_CART } from "./actionTypes";

import { DedeAction, DedeStore } from "./store";

const initialStore = {
  cart: [],
};

const reducer = (
  state: DedeStore = initialStore,
  action: DedeAction
): DedeStore => {
  if (action.type === DECREASE) {
    return {
      ...state,
      cart: state.cart.map((item) => {
        if (item.product.id === action.props.product.id) {
          if (item.amount === 0) {
            return item;
          } else {
            item.amount--;
          }
        }
        return item;
      }),
    };
  }
  if (action.type === INCREASE) {
    console.log("estado store", state);
    const newCartItems = state.cart;

    let exists = false;

    newCartItems.forEach((item) => {
      if (item.product.id === action.props.product.id) {
        exists = true;
        item.amount++;
      }
    });

    if (!exists) {
      newCartItems.push({ product: action.props.product, amount: 1 });
    }

    return {
      ...state,
      cart: newCartItems,
    };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter(
        (item) => item.product.id !== action.props.product.id
      ),
    };
  }
  /*
    if (action.type === GET_TOTALS) {
        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { product, amount } = cartItem;
            cartTotal.amount += amount;
            cartTotal.total += Math.floor(amount * product.price!);
            return cartTotal;
        }, { amount: 0, total: 0 });
        return { ...state, total, amount };
    }*/
  return state;
};

export default reducer;
