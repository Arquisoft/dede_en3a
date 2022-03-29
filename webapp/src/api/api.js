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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.addOrder = exports.getProducts = exports.addProduct = exports.getUsers = exports.addUser = exports.logInUser = exports.signUpUser = void 0;
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("../utils/firebase");
var firestore_2 = require("firebase/firestore");
var auth_1 = require("firebase/auth");
var userCollection = (0, firestore_1.collection)(firebase_1.db, "user");
var productCollection = (0, firestore_1.collection)(firebase_1.db, "products");
var orderCollection = (0, firestore_1.collection)(firebase_1.db, "orders");
function signUpUser(auth, email, password) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.createUserWithEmailAndPassword)(auth, email, password)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.signUpUser = signUpUser;
function logInUser(auth, email, password) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.signInWithEmailAndPassword)(auth, email, password)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.logInUser = logInUser;
function addUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, firestore_1.addDoc)(userCollection, __assign({ created: Date.now() }, user))];
        });
    });
}
exports.addUser = addUser;
//test
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, firestore_1.getDocs)(userCollection).then(function (docs) {
                    return docs.docs.map(function (doc) { return doc.data(); });
                })];
        });
    });
}
exports.getUsers = getUsers;
function addProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, firestore_1.addDoc)(productCollection, __assign({}, product))];
        });
    });
}
exports.addProduct = addProduct;
function getProducts() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, firestore_1.getDocs)(productCollection).then(function (docs) {
                    return docs.docs.map(function (doc) { return doc.data(); });
                })];
        });
    });
}
exports.getProducts = getProducts;
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, firestore_1.addDoc)(orderCollection, __assign({}, order))];
        });
    });
}
exports.addOrder = addOrder;
function getOrder(email) {
    return __awaiter(this, void 0, void 0, function () {
        var q;
        return __generator(this, function (_a) {
            if (email != null && email != undefined) {
                q = (0, firestore_2.query)(orderCollection, (0, firestore_2.where)("userEmail", "==", email));
                return [2 /*return*/, (0, firestore_1.getDocs)(q).then(function (docs) {
                        return docs.docs.map(function (doc) { return doc.data(); });
                    })];
            }
            return [2 /*return*/, null];
        });
    });
}
exports.getOrder = getOrder;
