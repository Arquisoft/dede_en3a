import TopMenu from "../../menu/TopMenu";
import React, { useEffect, useState } from "react";
import { Product } from "../../../api/model/product";
import { getProducts } from "../../../api/api";
import CardItem from "../../CardItem/CardItem";
import styles from "./ShopPage.module.scss";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { increase } from "../../../redux/actions";

function ShopPage(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

  const refreshProductList = async () => {
    setProducts(await getProducts());
  };

  useEffect(() => {
    refreshProductList();
  }, []);

  let productList: JSX.Element[] = [];

  const dispatch: Dispatch<any> = useDispatch();

  const saveProduct = React.useCallback(
    (product: Product) => dispatch(increase(product)),
    [dispatch]
  );

  products.forEach((product) => {
    productList.push(
      <div className={styles.product}>
        <CardItem product={product} saveProductToCart={saveProduct}></CardItem>
      </div>
    );
  });

  return (
    <>
      <TopMenu></TopMenu>
      <div className={styles.headercontainer}>
        <div className={styles.header}>
          <div className={styles.title}>Shop</div>
          <div className={styles.subtitle}>
            Life is hard enough already. Let us make it a little easier.
          </div>
        </div>
        <div className={styles.productcardcontainer}> {productList}</div>
      </div>
    </>
  );
}

export default ShopPage;
