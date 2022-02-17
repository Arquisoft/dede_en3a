"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const api = express_1.default.Router();
//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users = [];
api.get("/users/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send(users);
}));
api.post("/users/add", [
    (0, express_validator_1.check)('name').isLength({ min: 1 }).trim().escape(),
    (0, express_validator_1.check)('email').isEmail().normalizeEmail(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.body.name;
    let email = req.body.email;
    let user = { name: name, email: email };
    users.push(user);
    return res.sendStatus(200);
}));
exports.default = api;
