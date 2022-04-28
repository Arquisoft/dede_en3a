import { useEffect, useState } from "react";
import { Product } from "../../api/model/product";
import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { Utils } from "../../utils/utilts";

type CardItemProps = {
  product: Product;
  saveProductToCart: (product: Product | any) => void;
};

export const CardItem: React.FC<CardItemProps> = ({
  saveProductToCart,
  product,
}) => {
  const addToCart = () => {
    if (product.stock !== 0) saveProductToCart(product);
  };
  const [rating, setRating] = useState(5);

  let stockMessage: JSX.Element = <></>;
  let outOfStockImageStyle;
  let cartOutOfStockStyle;

  if (product.stock! < 50) {
    stockMessage = <div className={styles.lowstock}>Low stock</div>;
    if (product.stock === 0) {
      outOfStockImageStyle = styles.outofstockimage;
      stockMessage = <div className={styles.lowstock}>Out of stock</div>;
      cartOutOfStockStyle = styles.cartoutofstock;
    }
  }

  useEffect(() => {
    setRating(Utils.getProductAverageRating(product));
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Link to={"/product/" + product.id}>
          <div className={styles.imagecontainer}>
            <img
              className={styles.cardproductimage + " " + outOfStockImageStyle}
              src={product.img}
            ></img>
            {stockMessage}
          </div>
        </Link>
        <div className={styles.descriptioncontainer}>
          <div className={styles.col1}>
            <div title={"cardItemName"} className={styles.productname}>
              {product.name}
            </div>
            <div title={"cardItemPrice"} className={styles.price}>
              {product.price + " $"}
            </div>
            <div style={{ display: "flex", marginTop: "0.5rem" }}>
              <Rating
                title={"cardItemRating"}
                name="read-only"
                value={rating}
                precision={0.5}
                readOnly
                size={"small"}
              />
              <div className={styles.ratingnumber}>({rating.toFixed(1)})</div>
            </div>
          </div>

          <div className={styles.col2}>
            <div
              title={"cardItemAddButton"}
              onClick={addToCart}
              className={styles.addtocart}
            >
              <span
                className={
                  "material-icons " +
                  styles.carticon +
                  " " +
                  cartOutOfStockStyle
                }
              >
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
