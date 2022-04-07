"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotals = exports.clearCart = exports.remove = exports.decrease = exports.increase = void 0;
var actionTypes = require("./actionTypes");
function increase(item) {
    return {
        type: actionTypes.INCREASE,
        props: {
            product: item,
        },
    };
}
exports.increase = increase;
function decrease(item) {
    return {
        type: actionTypes.DECREASE,
        props: {
            product: item,
        },
    };
}
exports.decrease = decrease;
function remove(item) {
    return {
        type: actionTypes.REMOVE,
        props: {
            product: item,
        },
    };
}
exports.remove = remove;
function clearCart(item) {
    return {
        type: actionTypes.CLEAR_CART,
        props: item,
    };
}
exports.clearCart = clearCart;
function getTotals(item) {
    return {
        type: actionTypes.GET_TOTALS,
        props: item,
    };
}
exports.getTotals = getTotals;
