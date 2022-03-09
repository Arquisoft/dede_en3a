import { Product } from "../../api/model/product";
import "./CardItem.scss";

type CardItemProps = {
  product: Product;
};

function CardItem(props: CardItemProps): JSX.Element {
  return (
    <>
      <div className="container">
        <img className="product-image" src={props.product.img}></img>
        <div className="description-container">
          <div className="col1">
            <div className="price">{props.product.price + " €"}</div>
            <div className="product-name">{props.product.name}</div>
          </div>
          <div className="col2">
            <div className="add-to-cart">
              <span className="material-icons">add_shopping_cart</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardItem;
