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


function AdminDashboard(): JSX.Element {
    const [option, setOptions] = React.useState([]);
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

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
        console.log(auth)
    }

    useEffect(() => {
        refreshUserList();
        refreshProductList();
        refreshOrderList();
    }, []);

    function usersDisplay(){
        const res : any = [];
        res.push(<div> USUARIOS </div>)
        users.forEach((user) => {
            res.push(
                <div> Email: {user.email} Name: {user.name} Creation Date: {user.created}</div>
            );
        });
        setOptions(res)
    }

    function productsDisplay(){
        const res : any = [];
        res.push(<div> PRODUCTS </div>)
        products.forEach((product) => {
            res.push(
                <div> Title: {product.title} ID: {product.id} Price: {product.price} Category: {product.category}</div>
            );
        });
        setOptions(res)
    }

    function ordersDisplay(){
        const res : any = [];
        res.push(<div> ORDERS </div>)
        orders.forEach((order) => {
            res.push(
                <div>Email: {order.userEmail} Address: {order.address} Cost: {order.totalAmount} Items: {order.items.length} Date: {order.created}</div>
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
                        <div className={styles.leftPanel}>
                            <button value={"users"} className={styles.options} onClick={setterOfOption}> Users </button>
                            <button value={"products"} className={styles.options} onClick={setterOfOption}> Products </button>
                            <button value={"orders"} className={styles.options} onClick={setterOfOption}> Orders </button>
                            <button value={"statistics"} className={styles.options} onClick={setterOfOption}> Statistics </button>
                        </div>
                        {option}
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