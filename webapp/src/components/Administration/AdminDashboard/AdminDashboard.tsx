import styles from "./AdminDashboard.module.scss";
import React, {useEffect, useState} from "react";
import {Product} from "../../../api/model/product";
import {
    addAdmin,
    addProduct,
    getAdmin,
    getOrder,
    getOrders,
    getProducts,
    getUsers, removeAdmin,
    removeProduct,
    updateProduct
} from "../../../api/api";
import {Filter} from "../../../api/model/filter";
import {User} from "../../../api/model/user";
import {Order} from "../../../api/model/orders/order";
import TopMenu from "../../menu/TopMenu";
import {useAuth} from "../../../context/AuthContext";
import {getAuth} from "firebase/auth";
import OrdersPage from "../../pages/OrdersPage/OrdersPage";
import MainPage from "../../pages/mainPage/MainPage";
import moment from "moment";
import Modal from "../../Modal/Modal";
import {Comments} from "../../../api/model/comments";
import { v4 as uuid } from 'uuid';
import {randomUUID} from "crypto";


function AdminDashboard(): JSX.Element {
    const [option, setOptions] = React.useState([]);
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [modal, setModal] = React.useState(<></>);

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

    const productAddHtml = (
        <div className={styles.modalAdmin}>
            <div className={styles.title}>Add a new product</div>
            <div className={styles.subtitle}>
                <div className={styles.mood}>
                    Name
                    <input className={styles.inputfield} id="input-name-form" type={"text"}></input>
                </div>
                <div className={styles.mood}>
                    Description
                    <input className={styles.inputfield} id="input-description-form" type={"text"}></input>
                </div>
                <div className={styles.mood}>
                    Price
                    <input className={styles.inputfield} id="input-price-form" type={"text"}></input>
                </div>
                <div className={styles.mood}>
                    ImageURL
                    <input className={styles.inputfield} id="input-image-form" type={"text"}></input>
                </div>
                <div className={styles.mood}>
                    Stock
                    <input className={styles.inputfield} id="input-stock-form" type={"text"}></input>
                </div>
                <div className={styles.mood}>
                    Category
                    <input className={styles.inputfield} id="input-category-form" type={"text"}></input>
                </div>
            </div>
            <div className={styles.mood}>
                <div className={styles.accept} onClick={() => AddProduct(
                    (document.getElementById("input-name-form") as HTMLInputElement).value,
                    (document.getElementById("input-description-form") as HTMLInputElement).value,
                    (document.getElementById("input-price-form") as HTMLInputElement).value,
                    (document.getElementById("input-image-form") as HTMLInputElement).value,
                    (document.getElementById("input-stock-form") as HTMLInputElement).value,
                    (document.getElementById("input-category-form") as HTMLInputElement).value
                )}>
                    Add
                </div>
                <div className={styles.accept} onClick={() => setModal(<></>)}>
                    Cancel
                </div>
            </div>
        </div>
    );

    function AddProduct(name : string, desc : string, price : string, img : string, stock : string, cat : string){
        var product: Product = {
            id: uuid(),
            category: cat,
            description: desc,
            img: img,
            price: parseFloat(price),
            title: name,
            name: name,
            comments: [],
            stock: parseFloat(stock)
        };
        updateProduct(product);
        setModal(<></>);
    }

    const productEditHtml = ((product : Product) =>
            <div className={styles.modalAdmin}>
                <div className={styles.title}>Edit a product</div>
                <div className={styles.subtitle}>
                    <div className={styles.mood}>
                        Name
                        <input className={styles.inputfield} id="input-name-form" type={"text"} defaultValue={product.name}></input>
                    </div>
                    <div className={styles.mood}>
                        Description
                        <input className={styles.inputfield} id="input-description-form" type={"text"} defaultValue={product.description}></input>
                    </div>
                    <div className={styles.mood}>
                        Price
                        <input className={styles.inputfield} id="input-price-form" type={"text"} defaultValue={product.price}></input>
                    </div>
                    <div className={styles.mood}>
                        ImageURL
                        <input className={styles.inputfield} id="input-image-form" type={"text"} defaultValue={product.img}></input>
                    </div>
                    <div className={styles.mood}>
                        Stock
                        <input className={styles.inputfield} id="input-stock-form" type={"text"} defaultValue={product.stock}></input>
                    </div>
                    <div className={styles.mood}>
                        Category
                        <input className={styles.inputfield} id="input-category-form" type={"text"} defaultValue={product.category}></input>
                    </div>
                </div>
                <div className={styles.mood}>
                    <div className={styles.accept} onClick={() => EditProduct(product.id,
                        product.comments!,
                        (document.getElementById("input-name-form") as HTMLInputElement).value,
                        (document.getElementById("input-description-form") as HTMLInputElement).value,
                        (document.getElementById("input-price-form") as HTMLInputElement).value,
                        (document.getElementById("input-image-form") as HTMLInputElement).value,
                        (document.getElementById("input-stock-form") as HTMLInputElement).value,
                        (document.getElementById("input-category-form") as HTMLInputElement).value
                    )}>
                        Edit
                    </div>
                    <div className={styles.accept} onClick={() => setModal(<></>)}>
                        Cancel
                    </div>
                </div>
            </div>
    );

    function EditProduct(id: string, comments : Comments[], name : string, desc : string, price : string, img : string, stock : string, cat : string){
        var product: Product = {
            id: id,
            category: cat,
            description: desc,
            img: img,
            price: parseFloat(price),
            title: name,
            name: name,
            comments: comments,
            stock: parseFloat(stock)
        };
        updateProduct(product);
        setModal(<></>);
    }

    const productDeleteHtml = ((product : Product) =>
            <div className={styles.modalAdmin2}>
                <div className={styles.title}>Edit a product</div>
                <div className={styles.subtitle}>
                    <div>
                        Write DELETE to verify
                        <input className={styles.inputfield} id="input-delete-form" type={"text"}></input>
                    </div>
                </div>
                <div className={styles.mood}>
                    <div className={styles.accept} onClick={() => DeleteProduct(product.id,
                        (document.getElementById("input-delete-form") as HTMLInputElement).value
                    )}>
                        Delete
                    </div>
                    <div className={styles.accept} onClick={() => setModal(<></>)}>
                        Cancel
                    </div>
                </div>
            </div>
    );

    function DeleteProduct(id: string, name : string){
        if(name === "DELETE"){
            removeProduct(id);
        }
        setModal(<></>);
    }

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
                <div className={styles.wrapperOptions}>
                    <div className={styles.displayOptions}> · Email: {user.email} // Name: {user.name} // Creation Date: {moment(dateUser).format("YYYY-MM-DD HH:MM:SS")}</div>
                    <button className={styles.indAdd} onClick={() => addAdmin(user.email, user.name)}>+</button>
                    <button className={styles.indDelete} onClick={() => removeAdmin(user.email)}>x</button>
                </div>
            );
        });
        setOptions(res)
    }

    function productsDisplay(){
        const res : any = [];
        res.push(<div className={styles.mood}>
            <div className={styles.displayTitle}> PRODUCTS </div>
            <button className={styles.indAdd} onClick={() => setModal(<Modal element={productAddHtml}></Modal>)}>+</button>
        </div>)
        products.forEach((product) => {
            res.push(
                <div className={styles.wrapperOptions}>
                    <div className={styles.displayOptions}>· Name: {product.title} // Stock: {product.stock} // Price: {product.price}$ // Category: {product.category}</div>
                    <button className={styles.indEdit} onClick={() => setModal(<Modal element={productEditHtml(product)}></Modal>)}>o</button>
                    <button className={styles.indDelete} onClick={() => setModal(<Modal element={productDeleteHtml(product)}></Modal>)}>x</button>
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

    function statisticsDisplay(){
        const res : any = [];
        res.push(<div className={styles.displayTitle}> STATISTICS </div>)

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
                statisticsDisplay()
                break;
            }
        }
    }

    return (
        <>
            {auth ? (
                <>
                    <TopMenu></TopMenu>
                    {modal}
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