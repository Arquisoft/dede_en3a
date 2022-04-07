"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCartItem = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var actions_1 = require("../../../redux/actions");
require("./ProductCartItem.scss");
var ProductCartItem = function (_a) {
    var product = _a.product;
    var dispatch = (0, react_redux_1.useDispatch)();
    var _b = (0, react_1.useState)(), productAmount = _b[0], setProductState = _b[1];
    var saveProduct = react_1.default.useCallback(function (product) { return dispatch((0, actions_1.increase)(product)); }, [dispatch]);
    var decreaseProduct = react_1.default.useCallback(function (product) { return dispatch((0, actions_1.decrease)(product)); }, [dispatch]);
    var increaseButtonAction = function () {
        saveProduct(product.product);
        setProductState(product.amount + 1);
    };
    var decreaseButtonAction = function () {
        decreaseProduct(product.product);
        setProductState(product.amount - 1);
    };
    //const [, updateState] = React.useState<{}>();
    //const forceUpdate = React.useCallback(() => updateState({}), []);
    return (<>
      <div className="product-cart-container">
        <img className="product-cart-product-image" src={product.product.img}></img>
        <div className="product-cart-description-container">
          <div className="row1">
            <div className="price">{product.product.price + " €"}</div>
            <div className="product-name">{product.product.name}</div>
          </div>
          <div className="row2">
            <span className="material-icons" onClick={decreaseButtonAction}>
              remove
            </span>
            <div className="product-cart-amount">{product.amount}</div>
            <span className="material-icons" onClick={increaseButtonAction}>
              add
            </span>
          </div>
        </div>
      </div>
    </>);
};
exports.ProductCartItem = ProductCartItem;
exports.default = exports.ProductCartItem;
