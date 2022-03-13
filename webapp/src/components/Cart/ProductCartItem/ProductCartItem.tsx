import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Product } from "../../../api/model/product";
import { decrease, increase } from "../../../redux/actions";
import { CartItem } from "../../../redux/models/CartItem";
import "./ProductCartItem.scss";

type ProductCartItemProps = {
  product: CartItem;
};

export const ProductCartItem: React.FC<ProductCartItemProps> = ({
  product,
}) => {
  const dispatch: Dispatch<any> = useDispatch();

  const [productAmount, setProductState] = useState<number>();

  const saveProduct = React.useCallback(
    (product: Product) => dispatch(increase(product)),
    [dispatch]
  );

  const decreaseProduct = React.useCallback(
    (product: Product) => dispatch(decrease(product)),
    [dispatch]
  );

  const increaseButtonAction = () => {
    saveProduct(product.product);
    setProductState(product.amount + 1);
  };

  const decreaseButtonAction = () => {
    decreaseProduct(product.product);
    setProductState(product.amount - 1);
  };

  return (
    <>
      <div className="product-cart-container">
        <img className="product-image" src={product.product.img}></img>
        <div className="product-cart-description-container">
          <div className="row1">
            <div className="price">{product.product.price + " €"}</div>
            <div className="product-name">{product.product.name}</div>
          </div>
          <div className="row2">
            <span className="material-icons" onClick={decreaseButtonAction}>
              remove
            </span>
            <div className="product-cart-amount">{productAmount}</div>
            <span className="material-icons" onClick={increaseButtonAction}>
              add
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCartItem;
