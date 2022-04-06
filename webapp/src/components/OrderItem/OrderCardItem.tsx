import { OrderInd } from "../../api/model/orders/orderInd";
import styles from "./OrderCardItem.module.scss";

type OrderCardItem = {
  orderItem: OrderInd;
};

function OrderCardItem(ord: OrderCardItem): JSX.Element {
  return (
    <>
      <div className={styles.productcartcontainer}>
        <img className={styles.productimage} src={ord.orderItem.img}></img>
        <div className={styles.productcartdescriptioncontainer}>
          <div className={styles.row1}>
            <div className={styles.price}>{ord.orderItem.price + " €"}</div>
            <div className={styles.productname}>{ord.orderItem.title}</div>
            <div className={styles.productammount}>
              x {ord.orderItem.amount}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderCardItem;
