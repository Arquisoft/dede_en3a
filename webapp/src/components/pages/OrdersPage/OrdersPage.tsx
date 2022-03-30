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

  let orderList: JSX.Element[] = [];

  if (orders != null || orders != undefined) {
    orders.forEach((order) => {
      let group: JSX.Element[] = [];
      order.items.forEach((indOrd) => {
        group.push(
          <div className={styles.order}>
            <OrderCardItem orderItem={indOrd}></OrderCardItem>
          </div>
        );
      });
      let dateOrder = new Date(order.created);
      orderList.push(
        <div className={styles.orderwrapper}>
          <div className={styles.ordersname}>
            Date: {moment(dateOrder).format("YYYY-MM-DD HH:MM:SS")}
          </div>
          <div className={styles.ordersname}>Address: {order.address}</div>
          <div className={styles.ordersname}>
            Total ammount: {order.totalAmount} €
          </div>
          <div>{group}</div>
        </div>
      );
    });
  }

  return (
    <>
      <TopMenu></TopMenu>
      <div className={styles.headercontainer}>
        <div className={styles.header}>
          <div className={styles.title}>Orders</div>
          <div className={styles.ordercarditemcontainer}>{orderList}</div>
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
