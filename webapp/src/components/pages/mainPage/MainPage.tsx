import "./MainPage.scss";
import CardItem from "../../CardItem/CardItem";
import { getProducts, addProduct, getUsers } from "../../../api/api";
import { Product } from "../../../api/model/product";
import React, { useEffect, useState } from "react";
import { User } from "../../../api/model/user";
import TopMenu from "../../menu/TopMenu";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux"
import {useDispatch} from "react-redux";
import {increase} from "../../../redux/actions";

type MainPageProps = {};

function MainPage(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

  const refreshProductList = async () => {
    setProducts(await getProducts());
  };

  useEffect(() => {
    refreshProductList();
  }, []);

  let productList: JSX.Element[] = [];



  const dispatch: Dispatch<any> = useDispatch();

  const saveArticle = React.useCallback(
      (product: Product) => dispatch(increase(product)),
      [dispatch]
  )

  products.forEach((product) => {
    productList.push(
        <div className="product">
          <CardItem product={product} saveProductToCart={ saveArticle }></CardItem>
        </div>
    );
  });


  return (
    <>
      <TopMenu></TopMenu>

      <div className="header-container">
        <div className="header">
          <div className="title">Dede</div>
          <div className="subtitle">A decentralized ecommerce website.</div>
        </div>
        <div className="product-card-container">{productList}</div>
      </div>
    </>
  );
}

export default MainPage;
