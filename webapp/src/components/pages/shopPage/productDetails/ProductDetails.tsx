import TopMenu from "../../../menu/TopMenu";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getProductById,
  getUsersByEmail,
  updateProduct,
} from "../../../../api/api";
import { Product } from "../../../../api/model/product";
import styles from "./ProductDetails.module.scss";
import { Rating } from "@mui/material";
import { Comments } from "../../../../api/model/comments";
import { useAuth } from "../../../../context/AuthContext";
import { User } from "../../../../api/model/user";
import HeaderBackground from "../../../HeaderBackground/HeaderBackground";
import { Utils } from "../../../../utils/utilts";
import { increase } from "../../../../redux/actions";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { display } from "@mui/system";

function ProductDetails(): JSX.Element {
  const { id } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();

  const refreshProductList = async () => {
    setProducts(await getProductById(id));
  };

  const [users, setUsers] = useState<User[]>([]);
  const { getCurrentUser } = useAuth();

  const refreshUserList = async () => {
    setUsers(await getUsersByEmail(getCurrentUser()?.email));
  };

  useEffect(() => {
    setProduct(products.filter((p) => p.id === id)[0]);
  }, [products]);

  let valueGet = 2.5;

  function setValue(valueSet: number | null) {
    if (valueSet != null) {
      valueGet = valueSet;
    }
  }
  const dispatch: Dispatch<any> = useDispatch();
  const saveProduct = (p: Product) => {
    if (product?.stock !== 0) dispatch(increase(p));
  };
  let outOfStock = "";
  if (product?.stock === 0) {
    outOfStock = styles.outofstock;
  }

  useEffect(() => {
    refreshUserList();
    refreshProductList();
  }, []);

  function callSender(message: string, rating: number) {
    let name: string = "Anonimous";

    if (users != null && users != undefined) {
      users.forEach((user) => {
        name = user.name;
      });
    }

    const comment: Comments = {
      author: name,
      message: message,
      userImage: "https://cdn.onlinewebfonts.com/svg/img_184513.png",
      rating: rating,
    };

    products.forEach(async (product) => {
      product.comments?.push(comment);
      await updateProduct(product)
        .then(() => {
          refreshProductList();
          console.log(comment);
        })
        .catch(() => {
          alert("Not able to add comment :(");
        });
    });
  }

  function loadComments() {
    products.forEach((product) => {
      product.comments
        ?.slice()
        .reverse()
        .forEach((comment) => {
          commentList.push(
            <div className={styles.wrapperWholeComment}>
              <div className={styles.commentWrapper}>
                <img className={styles.userImage} src={comment.userImage}></img>
                <div className={styles.username}>{comment.author}</div>
              </div>
              <Rating
                name="read-only"
                value={comment.rating}
                precision={0.5}
                readOnly
                size={"small"}
              />
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
            <div title={"reviewTitle"} className={styles.productName}>
              {product.name}
            </div>
            <img
              title={"reviewImage"}
              className={styles.productImage}
              src={product.img}
            ></img>
          </div>
          <div className={styles.wrapperRight}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className={styles.subtitle}>
                Price <b> {product.price} €</b>
              </div>
              <div className={styles.subtitle}>
                Stock <b> {product.stock} </b>
              </div>
            </div>

            <div className={styles.subtitle}>Description: </div>
            <div className={styles.text}>{product.description}</div>
            <div className={styles.subtitle}>
              Rating:
              <div>
                <Rating
                  name="half-rating"
                  defaultValue={2.5}
                  precision={0.5}
                  size="large"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
              <div className={styles.buttonsComments}>
                <div
                  onClick={() => {
                    saveProduct(products[0]);
                  }}
                  className={styles.addtocart + " " + outOfStock}
                >
                  Add to cart
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <TopMenu></TopMenu>
      <HeaderBackground></HeaderBackground>
      <div className={styles.container}>
        <>{productList}</>
        <hr
          style={{ marginTop: "2rem", marginLeft: "3rem", width: "70%" }}
        ></hr>
        <div className={styles.subheader}>
          <div className={styles.subsubtitle}>Add a Review:</div>
          <div className={styles.commentWrapper}>
            <input
              className={styles.inputComment}
              id="input-comment-form"
              type={"text"}
            ></input>
            <div className={styles.buttonsComments}>
              <button
                title={"setMessage"}
                type="button"
                onClick={() =>
                  callSender(
                    (
                      document.getElementById(
                        "input-comment-form"
                      ) as HTMLInputElement
                    ).value,
                    valueGet
                  )
                }
              >
                Send
              </button>
            </div>
          </div>
          <div className={styles.subsubtitle}>Reviews:</div>
          {loadComments()}
          <>{commentList}</>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
