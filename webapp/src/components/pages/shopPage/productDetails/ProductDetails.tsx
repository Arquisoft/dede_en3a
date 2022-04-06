import TopMenu from "../../../menu/TopMenu";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getProductById} from "../../../../api/api";
import {Product} from "../../../../api/model/product";
import styles from "./ProductDetails.module.scss";
import {Rating} from "@mui/material";


function ProductDetails(): JSX.Element {
    const { id } = useParams();

    const [products, setProducts] = useState<Product[]>([]);

    const refreshProductList = async () => {
        setProducts(await getProductById(id));
    };

    useEffect(() => {
        refreshProductList();
    }, []);

    function loadComments() {
        products.forEach((product) => {
            product.comments?.forEach((comment) => {
                commentList.push(
                    <div className={styles.wrapperWholeComment}>
                        <div className={styles.commentWrapper}>
                            <img className={styles.userImage} src={comment.userImage} ></img>
                            <div className={styles.username}>{comment.author}</div>
                        </div>
                        <Rating name="read-only" value={comment.rating} readOnly size={"small"}/>
                        <div className={styles.text}>{comment.message}</div>
                    </div>
                );
            });
        });
    }

    let productList: JSX.Element[] = [];
    let commentList: JSX.Element[] = [];

    if (products != null || products != undefined) {
        products.forEach((product) => {
            productList.push(
                <div className={styles.headerContainer}>
                    <div className={styles.wrapperLeft}>
                        <div className={styles.productName}>{product.name}</div>
                        <img className={styles.productImage} src={product.img} ></img>
                    </div>
                    <div className={styles.wrapperRight}>
                        <div className={styles.subtitle}>{"Price: " + product.price + " $"}</div>
                        <div className={styles.subtitle}>Description: </div>
                        <div className={styles.text}>{product.description}</div>
                        <div className={styles.subtitle}>Rating:</div>
                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} size="large"/>
                    </div>
                </div>
            );
        });
    }

    return(
        <>
            <TopMenu></TopMenu>
            <>{productList}</>
            <div className={styles.subheader}>
                <div className={styles.subsubtitle}>Add a Review:</div>
                <input className={styles.inputComment} id= "input-form" type={"text"}></input><br/><br/>
                <div className={styles.subsubtitle}>Reviews:</div>
                {
                    loadComments()
                }
                <>{commentList}</>
            </div>
        </>
    );
}

export default ProductDetails;