import { useState } from "react";
import { Product } from "../../api/model/product";
import "./CardItem.scss";

type CardItemProps = {
  product: Product;
  saveProductToCart: (product: Product | any) => void;
};

export const CardItem: React.FC<CardItemProps> = ({
  saveProductToCart,
  product,
}) => {
  const addToCart = () => {
    saveProductToCart(product);
  };

  return (
    <>
      <div className="container">
        <img className="card-product-image" src={product.img}></img>
        <div className="description-container">
          <div className="col1">
            <div className="price">{product.price + " €"}</div>
            <div className="product-name">{product.name}</div>
          </div>
          <div className="col2">
            <div onClick={addToCart} className="add-to-cart">
              <span className="material-icons cart-icon">
                add_shopping_cart
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
