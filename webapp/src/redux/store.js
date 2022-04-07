"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var reducer_1 = require("./reducer");
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var initialStore = {
    cart: [],
};
exports.store = (0, redux_1.createStore)(reducer_1.default, (0, redux_1.applyMiddleware)(redux_thunk_1.default));
