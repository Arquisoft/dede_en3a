import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Product } from "../../../api/model/product";
import { decrease, increase } from "../../../redux/actions";
import { CartItem } from "../../../redux/models/CartItem";
import { Utils } from "../../../utils/utilts";
import styles from "./ProductCartItem.module.scss";

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

  //const [, updateState] = React.useState<{}>();
  //const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <>
      <div className={styles.productcartcontainer}>
        <img
          className={styles.productcartproductimage}
          src={product.product.img}
        ></img>
        <div className={styles.productcartdescriptioncontainer}>
          <div className={styles.productname}>{product.product.name}</div>
          <div className={styles.price}>{product.product.price + " €"}</div>
          <div className={styles.row2}>
            <span className={"material-icons"} onClick={decreaseButtonAction}>
              remove
            </span>
            <div className={styles.productcartamount}>{product.amount}</div>
            <span className={"material-icons"} onClick={increaseButtonAction}>
              add
            </span>
          </div>
          <div className={styles.totalprice}>
            {(product.amount * product.product.price).toFixed(2)} €
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCartItem;
