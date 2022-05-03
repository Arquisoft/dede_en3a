import styles from "./AdminDashboard.module.scss";
import React, { useEffect, useState } from "react";
import { Product } from "../../../api/model/product";
import {
  addAdmin,
  addProduct,
  getAdmin,
  getOrder,
  getOrders,
  getProducts,
  getUsers,
  removeAdmin,
  removeProduct,
  updateProduct,
} from "../../../api/api";
import { Filter } from "../../../api/model/filter";
import { User } from "../../../api/model/user";
import { Order } from "../../../api/model/orders/order";
import TopMenu from "../../menu/TopMenu";
import { useAuth } from "../../../context/AuthContext";
import { getAuth } from "firebase/auth";
import OrdersPage from "../../pages/OrdersPage/OrdersPage";
import MainPage from "../../pages/mainPage/MainPage";
import moment from "moment";
import Modal from "../../Modal/Modal";
import { Comments } from "../../../api/model/comments";
import { v4 as uuid } from "uuid";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryArea,
  VictoryLabel,
} from "victory";

function AdminDashboard(): JSX.Element {
  const [option, setOptions] = React.useState([]);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [modal, setModal] = React.useState(<></>);
  const [stat, setStat] = React.useState([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  };

  const refreshProductList = async () => {
    getProducts().then((prods) => setProducts(prods));
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
          <input
            className={styles.inputfield}
            id="input-name-form"
            type={"text"}
          ></input>
        </div>
        <div className={styles.mood}>
          Description
          <input
            className={styles.inputfield}
            id="input-description-form"
            type={"text"}
          ></input>
        </div>
        <div className={styles.mood}>
          Price
          <input
            className={styles.inputfield}
            id="input-price-form"
            type={"text"}
          ></input>
        </div>
        <div className={styles.mood}>
          ImageURL
          <input
            className={styles.inputfield}
            id="input-image-form"
            type={"text"}
          ></input>
        </div>
        <div className={styles.mood}>
          Stock
          <input
            className={styles.inputfield}
            id="input-stock-form"
            type={"text"}
          ></input>
        </div>
        <div className={styles.mood}>
          Category
          <input
            className={styles.inputfield}
            id="input-category-form"
            type={"text"}
          ></input>
        </div>
      </div>
      <div className={styles.mood}>
        <div
          className={styles.accept}
          onClick={() =>
            AddProduct(
              (document.getElementById("input-name-form") as HTMLInputElement)
                .value,
              (
                document.getElementById(
                  "input-description-form"
                ) as HTMLInputElement
              ).value,
              (document.getElementById("input-price-form") as HTMLInputElement)
                .value,
              (document.getElementById("input-image-form") as HTMLInputElement)
                .value,
              (document.getElementById("input-stock-form") as HTMLInputElement)
                .value,
              (
                document.getElementById(
                  "input-category-form"
                ) as HTMLInputElement
              ).value
            )
          }
        >
          Add
        </div>
        <div className={styles.accept} onClick={() => setModal(<></>)}>
          Cancel
        </div>
      </div>
    </div>
  );

  function AddProduct(
    name: string,
    desc: string,
    price: string,
    img: string,
    stock: string,
    cat: string
  ) {
    var product: Product = {
      id: uuid(),
      category: cat,
      description: desc,
      img: img,
      price: parseFloat(price),
      title: name,
      name: name,
      comments: [],
      stock: parseFloat(stock),
    };
    updateProduct(product).then(() =>
      refreshProductList().then(() => productsDisplay())
    );
    setModal(<></>);
  }

  const productEditHtml = (product: Product) => (
    <div className={styles.modalAdmin}>
      <div className={styles.title}>Edit a product</div>
      <div className={styles.subtitle}>
        <div className={styles.mood}>
          Name
          <input
            className={styles.inputfield}
            id="input-name-form"
            type={"text"}
            defaultValue={product.name}
          ></input>
        </div>
        <div className={styles.mood}>
          Description
          <input
            className={styles.inputfield}
            id="input-description-form"
            type={"text"}
            defaultValue={product.description}
          ></input>
        </div>
        <div className={styles.mood}>
          Price
          <input
            className={styles.inputfield}
            id="input-price-form"
            type={"text"}
            defaultValue={product.price}
          ></input>
        </div>
        <div className={styles.mood}>
          ImageURL
          <input
            className={styles.inputfield}
            id="input-image-form"
            type={"text"}
            defaultValue={product.img}
          ></input>
        </div>
        <div className={styles.mood}>
          Stock
          <input
            className={styles.inputfield}
            id="input-stock-form"
            type={"text"}
            defaultValue={product.stock}
          ></input>
        </div>
        <div className={styles.mood}>
          Category
          <input
            className={styles.inputfield}
            id="input-category-form"
            type={"text"}
            defaultValue={product.category}
          ></input>
        </div>
      </div>
      <div className={styles.mood}>
        <div
          className={styles.accept}
          onClick={() =>
            EditProduct(
              product.id,
              product.comments!,
              (document.getElementById("input-name-form") as HTMLInputElement)
                .value,
              (
                document.getElementById(
                  "input-description-form"
                ) as HTMLInputElement
              ).value,
              (document.getElementById("input-price-form") as HTMLInputElement)
                .value,
              (document.getElementById("input-image-form") as HTMLInputElement)
                .value,
              (document.getElementById("input-stock-form") as HTMLInputElement)
                .value,
              (
                document.getElementById(
                  "input-category-form"
                ) as HTMLInputElement
              ).value
            )
          }
        >
          Edit
        </div>
        <div className={styles.accept} onClick={() => setModal(<></>)}>
          Cancel
        </div>
      </div>
    </div>
  );

  function EditProduct(
    id: string,
    comments: Comments[],
    name: string,
    desc: string,
    price: string,
    img: string,
    stock: string,
    cat: string
  ) {
    var product: Product = {
      id: id,
      category: cat,
      description: desc,
      img: img,
      price: parseFloat(price),
      title: name,
      name: name,
      comments: comments,
      stock: parseFloat(stock),
    };
    updateProduct(product).then(() => refreshProductList());
    setModal(<></>);
  }

  const productDeleteHtml = (product: Product) => (
    <div className={styles.modalAdmin2}>
      <div className={styles.title}>Edit a product</div>
      <div className={styles.subtitle}>
        <div>
          Write DELETE to verify
          <input
            className={styles.inputfield}
            id="input-delete-form"
            type={"text"}
          ></input>
        </div>
      </div>
      <div className={styles.mood}>
        <div
          className={styles.accept}
          onClick={() =>
            DeleteProduct(
              product.id,
              (document.getElementById("input-delete-form") as HTMLInputElement)
                .value
            )
          }
        >
          Delete
        </div>
        <div className={styles.accept} onClick={() => setModal(<></>)}>
          Cancel
        </div>
      </div>
    </div>
  );

  function DeleteProduct(id: string, name: string) {
    if (name === "DELETE") {
      removeProduct(id).then(() =>
        refreshProductList().then(() => productsDisplay())
      );
    }
    setModal(<></>);
  }

  getAuth().onAuthStateChanged((user) => {
    refreshAdminList();
  });

  function AdminAuth(user: User) {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }

  useEffect(() => {
    refreshUserList();
    refreshProductList();
    refreshOrderList();
  }, []);

  useEffect(() => {
    productsDisplay();
  }, [products]);

  useEffect(() => {
    statisticsDisplay();
  }, [stat]);

  function usersDisplay() {
    const res: any = [];
    const userRows: JSX.Element[] = [];

    res.push(<div className={styles.displayTitle}> USERS </div>);

    users.forEach((user) => {
      let dateUser = new Date(user.created!);
      userRows.push(
        <tr>
          <td>{user.email}</td>
          <td>{user.name}</td>
          <td>{moment(dateUser).format("YYYY-MM-DD HH:MM:SS")}</td>
          <td>
            <button
              className={styles.indAdd}
              onClick={() => addAdmin(user.email, user.name)}
            >
              +
            </button>
            <button
              className={styles.indDelete}
              onClick={() => removeAdmin(user.email)}
            >
              x
            </button>
          </td>
        </tr>
      );
    });

    res.push(
      <table>
        <th>Email</th>
        <th>Name</th>
        <th>Creation date</th>
        <th>Add/Remove admin</th>
        {userRows}
      </table>
    );
    setOptions(res);
  }

  function productsDisplay() {
    const res: any = [];
    const productsRow: any = [];
    res.push(
      <div className={styles.mood}>
        <div className={styles.displayTitle}> PRODUCTS </div>
        <button
          className={styles.indAdd}
          onClick={() => setModal(<Modal element={productAddHtml}></Modal>)}
        >
          +
        </button>
      </div>
    );
    products.forEach((product) => {
      productsRow.push(
        <tr>
          <td>{product.title}</td>
          <td>{product.stock}</td>
          <td>{product.price}</td>
          <td>{product.category}</td>
          <td>
            <button
              className={styles.indEdit}
              onClick={() =>
                setModal(<Modal element={productEditHtml(product)}></Modal>)
              }
            >
              o
            </button>
            <button
              className={styles.indDelete}
              onClick={() =>
                setModal(<Modal element={productDeleteHtml(product)}></Modal>)
              }
            >
              x
            </button>
          </td>
        </tr>
      );
    });
    res.push(
      <table>
        <th>Name</th>
        <th>Stock</th>
        <th>Price</th>
        <th>Category</th>
        <th>Edit/Delete</th>
        {productsRow}
      </table>
    );
    setOptions(res);
  }

  function ordersDisplay() {
    const res: any = [];

    const ordersRow: any = [];

    res.push(<div className={styles.displayTitle}> ORDERS </div>);
    orders.forEach((order) => {
      const dateOrder = new Date(order.created);
      const deliveryDate = new Date(order.estimatedDelivery);

      ordersRow.push(
        <tr>
          <td>{order.userEmail}</td>
          <td>{order.address}</td>
          <td>{order.totalAmount}</td>
          <td>{order.items.length}</td>
          <td>{moment(dateOrder).format("YYYY-MM-DD HH:MM:SS")}</td>
          <td>{moment(deliveryDate).format("YYYY-MM-DD HH:MM:SS")}</td>
        </tr>
      );
    });

    res.push(
      <table>
        <th>User email</th>
        <th>Adress</th>
        <th>Cost</th>
        <th>Items amount</th>
        <th>Creation date</th>
        <th>Estimate delivery</th>
        {ordersRow}
      </table>
    );
    setOptions(res);
  }

  function statisticsDisplay() {
    const res: any = [];

    const var1: any[] = [];
    let var2: number = 0;
    let var3: any[] = [];

    products.forEach((prod) => {
      var1.push({ x: prod.name, y: prod.stock });
      let count = 0;
      let num = 0;
      prod.comments?.forEach((com) => {
        count += com.rating;
        num++;
      });
      if (count != 0) {
        count = count / num;
      }
      var3.push({ x: prod.name, y: count });
    });

    orders.forEach((ord) => {
      var2 += ord.totalAmount;
    });

    const opt1: any = [];
    const opt2: any = [];
    const opt3: any = [];

    opt1.push(
      <div className={styles.backgroundStats}>
        <VictoryChart
          height={400}
          width={1400}
          domainPadding={{ x: 100, y: [0, 10] }}
        >
          <VictoryBar style={{ data: { fill: "tomato" } }} data={var1} />
        </VictoryChart>
      </div>
    );

    opt2.push(
      <svg viewBox="0 0 800 800">
        <VictoryPie
          standalone={false}
          width={800}
          height={800}
          data={var3}
          innerRadius={100}
          labelRadius={200}
          style={{ labels: { fontSize: 20, fill: "tomato" } }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20, fill: "white" }}
          x={400}
          y={400}
          text="RATINGS"
        />
      </svg>
    );

    opt3.push(
      <div className={styles.manin}>Total revenue: {var2.toFixed(2)}$</div>
    );

    res.push(
      <div>
        <div className={styles.displayTitle}> STATISTICS </div>
        <div className={styles.optionsA}>
          <button
            onClick={() => {
              setStat(opt1);
            }}
          >
            Product Stock
          </button>
          <button onClick={() => setStat(opt2)}>Rating Chart</button>
          <button onClick={() => setStat(opt3)}>Revenue</button>
        </div>
        <div>{stat}</div>
      </div>
    );
    setOptions(res);
  }

  function setterOfOption(opt: any) {
    switch (opt.target.value) {
      case "users": {
        console.log("users");
        usersDisplay();
        break;
      }
      case "products": {
        console.log("products");
        productsDisplay();
        break;
      }
      case "orders": {
        console.log("orders");
        ordersDisplay();
        break;
      }
      case "statistics": {
        console.log("statistics");
        statisticsDisplay();
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
                <button
                  value={"users"}
                  className={styles.options}
                  onClick={setterOfOption}
                >
                  {" "}
                  Users{" "}
                </button>
                <button
                  value={"products"}
                  className={styles.options}
                  onClick={setterOfOption}
                >
                  {" "}
                  Products{" "}
                </button>
                <button
                  value={"orders"}
                  className={styles.options}
                  onClick={setterOfOption}
                >
                  {" "}
                  Orders{" "}
                </button>
                <button
                  value={"statistics"}
                  className={styles.options}
                  onClick={setterOfOption}
                >
                  {" "}
                  Statistics{" "}
                </button>
              </div>
              <div className={styles.optionvertical}>{option}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <TopMenu></TopMenu>
          <h1>YOU DO NOT HAVE PERMISSIONS TO ACCESS HERE</h1>
        </>
      )}
    </>
  );
}

export default AdminDashboard;
