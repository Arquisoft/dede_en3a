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
var react_router_dom_1 = require("react-router-dom");
var TopMenu_1 = require("../../menu/TopMenu");
require("./LoginPage.scss");
var react_1 = require("react");
var AuthContext_1 = require("../../../context/AuthContext");
var firebase_1 = require("./../../../utils/firebase");
function LoginPage() {
    var _this = this;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)({
        email: "",
        password: "",
    }), user = _a[0], setUser = _a[1];
    var login = (0, AuthContext_1.useAuth)().login;
    var _b = (0, react_1.useState)(""), error = _b[0], setError = _b[1];
    var handleChangeEmail = function (e) {
        setUser(__assign(__assign({}, user), { email: e.currentTarget.value }));
    };
    var handleChangePassword = function (e) {
        setUser(__assign(__assign({}, user), { password: e.currentTarget.value }));
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setError("");
                    console.log(user);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, login(user.email, user.password).then(function (userCredential) {
                            navigate("/dashboard");
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1.code === "auth/user-not-found") {
                        setError("User not found");
                    }
                    else if (error_1.code === "auth/wrong-password") {
                        setError("Wring password for provided user");
                    }
                    else {
                        setError(error_1.message);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<>
      <TopMenu_1.default></TopMenu_1.default>
      <div className="login-page-container">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="login-wrapper">
            <h2>Login</h2>
            <h3>Email</h3>
            <input title={"email"} type="text" onChange={handleChangeEmail}></input>
            <h3>Password</h3>
            <input title={"password"} type="password" onChange={handleChangePassword}></input>
            <div className="register"></div>
            <div className="buttons">
              <button title={"loggin"} type={"submit"} className="login">
                Login
              </button>
            </div>

            <div className="register-text">
              Need an account?{" "}
              <b onClick={function () { return navigate("/register"); }}>Register</b> here
              <br></br>
              <b onClick={function () { return firebase_1.auth.signOut(); }}>Log out</b>
            </div>
          </div>
        </form>
      </div>
    </>);
}
exports.default = LoginPage;
