import { Product } from "../../api/model/product";
import "./CardItem.scss";

type CardItemProps = {
  product: Product;
};

function CardItem(props: CardItemProps): JSX.Element {
  return (
    <>
      <div className="container">
        <img src={props.product.img}></img>
        <div className="product-name">{props.product.name}</div>
      </div>
    </>
  );
}

export default CardItem;
