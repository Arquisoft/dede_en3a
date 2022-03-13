import TopMenu from "../../menu/TopMenu";
import {useEffect, useState} from "react";
import {Product} from "../../../api/model/product";
import {getProducts} from "../../../api/api";
import CardItem from "../../CardItem/CardItem";
import "./ShopPage.scss";


function ShopPage():JSX.Element{
    const [products, setProducts] = useState<Product[]>([]);

    const refreshProductList = async () => {
        setProducts(await getProducts());
    };

    useEffect(() => {
        refreshProductList();
    }, []);

    let productList: JSX.Element[] = [];

    products.forEach((product) => {
        productList.push(
            <div className="product">
                <CardItem product={product}></CardItem>
            </div>
        );
    });

    return(
        <>
            <TopMenu></TopMenu>
            <div className="header-container">
                <div className="header">
                    <div className="title">Shop</div>
                    <div className="subtitle">Life is hard enough already. Let us make it a little easier.</div>
                </div>
                <div className="product-card-container">{productList}</div>
            </div>
        </>
    );
}

export default ShopPage;