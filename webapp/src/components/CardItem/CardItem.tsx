import { useEffect, useState } from "react";
import { Product } from "../../api/model/product";
import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

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
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const ratings = product?.comments?.map((p) => p.rating);
    const sum = ratings?.reduce((a, b) => a + b, 0);
    setRating(ratings! === undefined ? 0 : sum! / ratings!.length || 0);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Link to={"/product/" + product.id}>
          <div className={styles.imagecontainer}>
            <img className={styles.cardproductimage} src={product.img}></img>
          </div>
        </Link>
        <div title={"cardItemDescription"} className={styles.descriptioncontainer}>
          <div className={styles.col1}>
            <div title={"cardItemName"} className={styles.productname}>{product.name}</div>
            <div title={"cardItemPrice"} className={styles.price}>{product.price + " $"}</div>
            <div title={"cardItemRating"} style={{ display: "flex", marginTop: "0.5rem" }}>
              <Rating
                name="read-only"
                value={rating}
                precision={0.5}
                readOnly
                size={"small"}
              />
              <div className={styles.ratingnumber}>({rating})</div>
            </div>
          </div>

          <div className={styles.col2}>
            <div title={"cardItemAddButton"} onClick={addToCart} className={styles.addtocart}>
              <span className={"material-icons " + styles.carticon}>
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
