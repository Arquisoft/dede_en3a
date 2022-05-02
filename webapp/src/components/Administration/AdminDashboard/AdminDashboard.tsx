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
import {VictoryPie, VictoryChart, VictoryBar, VictoryArea, VictoryLabel} from "victory"
import {useNavigate} from "react-router-dom";


function AdminDashboard(): JSX.Element {
    const [option, setOptions] = React.useState([]);
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [modal, setModal] = React.useState(<></>);
    const [stat, setStat] = React.useState([]);
    const [modalErr, setModalErr] = React.useState(<></>);

    const navigate = useNavigate();

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
        updateProduct(product).then(() => refreshProductList().then(() => productsDisplay()));
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
        updateProduct(product).then(() => refreshProductList().then(() => productsDisplay()));
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
            removeProduct(id).then(() => refreshProductList().then(() => productsDisplay()));
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
        ModalErr();
    }, []);

    function ModalErr(){
        let a : any = [];
        a.push();
        setModalErr(<Modal element={ErrHtml}></Modal>)
    }

    const ErrHtml = (
            <div className={styles.modalAdmin2}>
                <div className={styles.title}>Err 403</div>
                <div className={styles.subtitle}>
                    <div>
                        YOU DO NOT HAVE THE PERMISSIONS TO ACCESS HERE
                    </div>
                </div>
                <div className={styles.mood}>
                    <div className={styles.accept} onClick={() => {setModal(<></>); navigate("/home");}}>
                        Okay
                    </div>
                </div>
            </div>
    );


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

        const var1 : any[] = [];
        let var2 : number = 0;
        let var3: any[] = [];

        products.forEach((prod) => {
            var1.push({x: prod.name, y :prod.stock});
            let count = 0;
            let num = 0;
            prod.comments?.forEach((com) =>{
                count += com.rating
                num++;
            })
            if(count != 0){
                count = count / num;
            }
            var3.push({x : prod.name, y : count})
        });

        orders.forEach((ord) => {
            var2 += ord.totalAmount;
        });

        const opt1 : any = []
        const opt2 : any = []
        const opt3 : any = []

        opt1.push(<div className={styles.backgroundStats}>
            <VictoryChart height={400} width={1400}
                          domainPadding={{ x: 100, y: [0, 10] }}>
                <VictoryBar
                    style={{data: { fill: 'tomato'}}}
                    data={var1}
                />
            </VictoryChart>
        </div>)

        opt2.push(<svg viewBox="0 0 800 800">
            <VictoryPie
                standalone={false}
                width={800} height={800}
                data={var3}
                innerRadius={100} labelRadius={200}
                style={{ labels: { fontSize: 20, fill: "tomato" } }}
            />
            <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 20 , fill: "white"}}
                x={400} y={400}
                text="RATINGS"
            />
        </svg>)

        opt3.push(<div className={styles.manin}>Total revenue: {var2.toFixed(2)}$</div>)

        res.push(<div>
            <div className={styles.displayTitle}> STATISTICS </div>
            <div className={styles.optionsA}>
                <button onClick={() => {setStat(opt1)}}>Product Stock</button>
                <button onClick={() => setStat(opt2)}>Rating Chart</button>
                <button onClick={() => setStat(opt3)}>Revenue</button>
            </div>
            <div>{stat}</div>
        </div>)
        setOptions(res);
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
                    {modalErr}
                </>
            }
        </>
    );
}

export default AdminDashboard