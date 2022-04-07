"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("./actionTypes");
var initialStore = {
    cart: [],
};
var reducer = function (state, action) {
    if (state === void 0) { state = initialStore; }
    if (action.type === actionTypes_1.DECREASE) {
        return __assign(__assign({}, state), { cart: state.cart
                .map(function (item) {
                if (item.product.id === action.props.product.id) {
                    if (item.amount === 0) {
                        return item;
                    }
                    else {
                        item.amount--;
                    }
                }
                return item;
            })
                .filter(function (item) { return item.amount !== 0; }) });
    }
    if (action.type === actionTypes_1.INCREASE) {
        var newCartItems = state.cart;
        var exists_1 = false;
        newCartItems.forEach(function (item) {
            if (item.product.id === action.props.product.id) {
                exists_1 = true;
                item.amount++;
            }
        });
        if (!exists_1) {
            newCartItems.push({ product: action.props.product, amount: 1 });
        }
        console.log("estado store", __assign(__assign({}, state), { cart: state.cart }));
        return __assign(__assign({}, state), { cart: newCartItems.filter(function (x) { return false; }).concat(newCartItems) });
    }
    if (action.type === actionTypes_1.CLEAR_CART) {
        return __assign(__assign({}, state), { cart: [] });
    }
    if (action.type === actionTypes_1.REMOVE) {
        return __assign(__assign({}, state), { cart: state.cart.filter(function (item) { return item.product.id !== action.props.product.id; }) });
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
exports.default = reducer;
