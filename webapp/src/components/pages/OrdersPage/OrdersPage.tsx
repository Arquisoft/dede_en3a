import TopMenu from "../../menu/TopMenu";
import "./OrdersPage.scss";
import {useEffect, useState} from "react";
import {getOrder} from "../../../api/api";
import {Order} from "../../../api/model/orders/order";
import {useAuth} from "../../../context/AuthContext";
import OrderCardItem from "../../OrderItem/OrderCardItem";
import moment from "moment";

function OrdersPage(): JSX.Element{

    const [orders, setOrders] = useState<Order[]>([]);
    const {getCurrentUser} = useAuth();

    const refreshOrderList = async () => {
        setOrders(await getOrder(getCurrentUser()?.email));
    };

    refreshOrderList();
    useEffect(() => {
        refreshOrderList();
    }, []);

    let orderList: JSX.Element[] = [];

    if(orders != null || orders != undefined){
        orders.forEach((order) => {
            if(order.items.length != 0){
                let group: JSX.Element[] = [];
                order.items.forEach((indOrd) => {
                    group.push(
                        <div className="order">
                            <OrderCardItem orderItem={indOrd}></OrderCardItem>
                        </div>
                    )
                });
                let dateOrder = new Date(order.created);
                orderList.push(
                    <div className="order-wrapper">
                        <div className="orders-name">Date: {moment(dateOrder).format('YYYY-MM-DD HH:MM:SS')}</div>
                        <div className="orders-name">Address: {order.address}</div>
                        <div className="orders-name">Total ammount: {order.totalAmount} €</div>
                        <div>{group}</div>
                    </div>
                );
            }
        });
    }

    return(
        <>
            <TopMenu></TopMenu>
            <div className="header-container">
                <div className="header">
                    <div className="title">Orders</div>
                    <div className="order-card-item-container">{orderList}</div>
                </div>
            </div>
        </>
    );
}

export default OrdersPage;