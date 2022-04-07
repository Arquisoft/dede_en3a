"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardItem = void 0;
require("./CardItem.scss");
var CardItem = function (_a) {
    var saveProductToCart = _a.saveProductToCart, product = _a.product;
    var addToCart = function () {
        saveProductToCart(product);
    };
    return (<>
        <div className="container">
          <img className="card-product-image" src={product.img}></img>
          <div className="description-container">
            <div className="col1">
              <div className="price">{product.price + " €"}</div>
              <div className="product-name">{product.name}</div>
            </div>
            <div className="col2">
              <div onClick={addToCart} className="add-to-cart">
                <span className="material-icons">add_shopping_cart</span>
              </div>
            </div>
          </div>
        </div>
      </>);
};
exports.CardItem = CardItem;
exports.default = exports.CardItem;
