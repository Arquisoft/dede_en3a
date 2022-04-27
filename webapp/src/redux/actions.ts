import { CartItem } from "./models/CartItem";
import * as actionTypes from "./actionTypes";
import { Product } from "../api/model/product";

export function increase(item: Product) {
  return {
    type: actionTypes.INCREASE,
    props: {
      product: item,
    },
  };
}
export function decrease(item: Product) {
  return {
    type: actionTypes.DECREASE,
    props: {
      product: item,
    },
  };
}
export function remove(item: Product) {
  return {
    type: actionTypes.REMOVE,
    props: {
      product: item,
    },
  };
}
export function clearCart(item: Product) {
  return {
    type: actionTypes.CLEAR_CART,
    props: item,
  };
}
export function getTotals(item: Product) {
  return {
    type: actionTypes.GET_TOTALS,
    props: item,
  };
}

export function setShippingCosts(shippingCost: number) {
  return {
    type: actionTypes.SET_SHIPPING_COST,
    props: shippingCost,
  };
}

export function setEstimatedDelivery(estimatedDelivery: number) {
  return {
    type: actionTypes.SET_ESTIMATED_DELIVERY,
    props: estimatedDelivery,
  };
}
