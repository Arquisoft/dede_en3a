import TopMenu from "../../menu/TopMenu";
import React, {useEffect, useState} from "react";
import {Product} from "../../../api/model/product";
import {getProducts} from "../../../api/api";
import CardItem from "../../CardItem/CardItem";
import "./ShopPage.scss";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {increase} from "../../../redux/actions";


function ShopPage():JSX.Element{
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
            <div className="product">
                <CardItem product={product} saveProductToCart={saveProduct}></CardItem>
            </div>
        );
    });

    return(
        <>
            <TopMenu></TopMenu>
            <div className="header-container">
                <div className="header">
                    <div title={"ShopTitle"} className="title">Shop</div>
                    <div className="subtitle">Life is hard enough already. Let us make it a little easier.</div>
                </div>
                <div title={"products"} className="product-card-container">{productList}</div>
            </div>
        </>
    );
}

export default ShopPage;