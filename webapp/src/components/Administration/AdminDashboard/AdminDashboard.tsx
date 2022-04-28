import styles from "./AdminDashboard.module.scss";
import React, {useEffect, useState} from "react";
import {Product} from "../../../api/model/product";
import {getAdmin, getOrder, getOrders, getProducts, getUsers} from "../../../api/api";
import {Filter} from "../../../api/model/filter";
import {User} from "../../../api/model/user";
import {Order} from "../../../api/model/orders/order";
import TopMenu from "../../menu/TopMenu";
import {useAuth} from "../../../context/AuthContext";
import {getAuth} from "firebase/auth";
import OrdersPage from "../../pages/OrdersPage/OrdersPage";
import MainPage from "../../pages/mainPage/MainPage";
import moment from "moment";


function AdminDashboard(): JSX.Element {
    const [option, setOptions] = React.useState([]);
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [modal, setModal] = useState(<div></div>);

    const refreshUserList = async () => {
        setUsers(await getUsers());
    };

    const refreshProductList = async () => {
        setProducts(await getProducts());
    };

    const refreshOrderList = async () => {
        setOrders(await getOrders());
    };

    const [auth, setAuth] = useState<boolean>(false);
    const { getCurrentUser } = useAuth();

    const refreshAdminList = async () => {
        getAdmin(getCurrentUser()?.email).then((user) => {
            AdminAuth(user);
        });
    };

    getAuth().onAuthStateChanged((user) => {
        refreshAdminList();
    })

    function AdminAuth(user : User){
        if(user){
            setAuth(true);
        }
        else{
            setAuth(false);
        }
    }

    useEffect(() => {
        refreshUserList();
        refreshProductList();
        refreshOrderList();
    }, []);

    function usersDisplay(){
        const res : any = [];
        res.push(<div className={styles.displayTitle}> USERS </div>)
        users.forEach((user) => {
            let dateUser = new Date(user.created!);
            res.push(
                <div className={styles.displayOptions}> · Email: {user.email} // Name: {user.name} // Creation Date: {moment(dateUser).format("YYYY-MM-DD HH:MM:SS")}</div>
            );
        });
        setOptions(res)
    }

    function productsDisplay(){
        const res : any = [];
        res.push(<div className={styles.mood}>
            <div className={styles.displayTitle}> PRODUCTS </div>
            <button className={styles.indAdd} onClick={() => setModal(<>ADDING</>)}>+</button>
        </div>)
        products.forEach((product) => {
            res.push(
                <div className={styles.wrapperOptions}>
                    <div className={styles.displayOptions}>· Name: {product.title} // Stock: {product.stock} // Price: {product.price}$ // Category: {product.category}</div>
                    <button className={styles.indEdit} onClick={() => setModal(<>EDIT</>)}>o</button>
                    <button className={styles.indDelete} onClick={() => setModal(<>DELETE</>)}>-</button>
                </div>
            );
        });
        setOptions(res)
    }

    function ordersDisplay(){
        const res : any = [];
        res.push(<div className={styles.displayTitle}> ORDERS </div>)
        orders.forEach((order) => {
            let dateOrder = new Date(order.created);
            res.push(
                <div className={styles.displayOptions}>· Email: {order.userEmail} // Address: {order.address} // Cost: {order.totalAmount}$ // Items: {order.items.length} // Date: {moment(dateOrder).format("YYYY-MM-DD HH:MM:SS")}</div>
            );
        });
        setOptions(res)
    }

    function setterOfOption(opt : any) {
        switch (opt.target.value){
            case "users":{
                console.log("users")
                usersDisplay();
                break;
            }
            case "products":{
                console.log("products")
                productsDisplay();
                break;
            }
            case "orders":{
                console.log("orders")
                ordersDisplay()
                break;
            }
            case "statistics":{
                console.log("statistics")
                break;
            }
        }
    }

    return (
        <>
            {auth ? (
                <>
                    <TopMenu></TopMenu>
                    <div className={styles.header}>
                        <div className={styles.bigText}> Administration Panel </div>
                        <div className={styles.optionleft}>
                            <div className={styles.leftPanel}>
                                <button value={"users"} className={styles.options} onClick={setterOfOption}> Users </button>
                                <button value={"products"} className={styles.options} onClick={setterOfOption}> Products </button>
                                <button value={"orders"} className={styles.options} onClick={setterOfOption}> Orders </button>
                                <button value={"statistics"} className={styles.options} onClick={setterOfOption}> Statistics </button>
                            </div>
                            <div className={styles.optionvertical}>{option}</div>
                        </div>
                    </div>
                </>)
                :
                <>
                    <TopMenu></TopMenu>
                    <h1>YOU DO NOT HAVE PERMISSIONS TO ACCESS HERE</h1>
                </>
            }
        </>
    );
}

export default AdminDashboard