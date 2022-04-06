import TopMenu from "../../../menu/TopMenu";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getProductById, getUsersByEmail, updateProduct} from "../../../../api/api";
import {Product} from "../../../../api/model/product";
import styles from "./ProductDetails.module.scss";
import {Rating} from "@mui/material";
import {Comments} from "../../../../api/model/comments";
import {useAuth} from "../../../../context/AuthContext";
import {User} from "../../../../api/model/user";


function ProductDetails(): JSX.Element {
    const { id } = useParams();

    const [products, setProducts] = useState<Product[]>([]);

    const refreshProductList = async () => {
        setProducts(await getProductById(id));
    };

    const [users, setUsers] = useState<User[]>([]);
    const { getCurrentUser } = useAuth();

    const refreshUserList = async () => {
        setUsers(await getUsersByEmail(getCurrentUser()?.email));
    };

    useEffect(() => {
        refreshUserList();
        refreshProductList();
    }, []);

    let valueGet = 2.5;

    function setValue(valueSet : number | null) {
        if(valueSet != null){
            valueGet = valueSet;
        }
    }

    function callSender(message: string, rating: number){
        let name : string = "Anonimous";

        if(users != null && users != undefined){
            users.forEach((user) => {
               name = user.name;
            });
        }

        const comment : Comments = {
            author: name,
            message: message,
            userImage: "http://cdn.onlinewebfonts.com/svg/img_184513.png",
            rating: rating,
        };


        products.forEach(async product => {
            product.comments?.push(comment);
            await updateProduct(product)
                .then(()=>{
                    refreshProductList();
                    console.log("IMPLEMENTAR FIREBASE FUNCTION QUE AÑADA EL MENSAJE EN LA DB");
                    console.log(comment);
                }).catch(()=>{
                    alert("Not able to add comment :(")
                });


        })

    }

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
                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} size="large"
                        onChange={(event, newValue) => {
                            setValue(newValue);}}/>
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
                <div className={styles.commentWrapper}>
                    <input className={styles.inputComment} id= "input-comment-form" type={"text"}></input>
                    <div className={styles.buttonsComments}>
                        <button title={"setMessage"} type = "button" onClick={() => callSender(
                            (document.getElementById("input-comment-form") as HTMLInputElement).value,
                            valueGet)}>Send</button>
                    </div>
                </div>
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