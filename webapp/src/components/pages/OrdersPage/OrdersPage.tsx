import TopMenu from "../../menu/TopMenu";
import styles from "./OrdersPage.module.scss";
import { useEffect, useState } from "react";
import { getOrder } from "../../../api/api";
import { Order } from "../../../api/model/orders/order";
import { useAuth } from "../../../context/AuthContext";
import OrderCardItem from "../../OrderItem/OrderCardItem";
import moment from "moment";

function OrdersPage(): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);
  const { getCurrentUser } = useAuth();

  const refreshOrderList = async () => {
    setOrders(await getOrder(getCurrentUser()?.email));
  };

  useEffect(() => {
    refreshOrderList();
  }, []);
  const getOrderHtml = (order: Order) => {
    const orderItemRows: JSX.Element[] = [];

    order.items.forEach((item) => {
      orderItemRows.push(
        <tr>
          <td>{item.title}</td>
          <td>{item.price.toFixed(2)} €</td>
          <td>{item.amount}</td>
          <td>{(item.price * item.amount).toFixed(2)} €</td>
        </tr>
      );
    });
    const html: JSX.Element = (
      <div className={styles.ordercontainer}>
        <table>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          {orderItemRows}
        </table>
        <div className={styles.orderrow}>
          Shipping costs: <b>{order.shippingCost} €</b>
        </div>
        <div className={styles.orderrow}>
          Total: <b>{order.totalAmount} €</b>
        </div>
        <div className={styles.orderrow}>
          Creation date:{" "}
          <b>{moment(new Date(order.created)).format("YYYY-MM-DD")}</b>
        </div>
        <div className={styles.orderrow}>
          Estimated delivery:{" "}
          <b>
            {moment(new Date(order.estimatedDelivery)).format("YYYY-MM-DD")}
          </b>
        </div>
        <div className={styles.orderrow}>
          Adress: <b>{order.address}</b>
        </div>
        <div className={styles.orderrow}>
          State: <b>{order.state}</b>
        </div>
      </div>
    );

    return html;
  };
  let orderList: JSX.Element[] = [];

  if (orders != null || orders != undefined) {
    orders.forEach((order) => {
      const orderElement = getOrderHtml(order);
      orderList.push(orderElement);
    });
  }

  return (
    <>
      <TopMenu></TopMenu>
      <div className={styles.headercontainer}>
        <div className={styles.header}>
          <div className={styles.title}>Orders</div>
        </div>
      </div>
      <div className={styles.ordercarditemcontainer}>{orderList}</div>
    </>
  );
}

export default OrdersPage;
