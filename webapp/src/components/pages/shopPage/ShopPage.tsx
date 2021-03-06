import TopMenu from "../../menu/TopMenu";
import React, { useEffect, useState } from "react";
import { Product } from "../../../api/model/product";
import { getProducts } from "../../../api/api";
import CardItem from "../../CardItem/CardItem";
import styles from "./ShopPage.module.scss";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { increase } from "../../../redux/actions";
import headerImg from "./pexels-photo-401107(1).jpg";
import { Filter } from "../../../api/model/filter";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import HeaderBackground from "../../HeaderBackground/HeaderBackground";
import { Footer } from "../Footer/Footer";

function ShopPage(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(<></>);
  const [sorting, setSorting] = useState("Name");
  const [typeFilter, setTypeFilter] = useState<Filter | null>();

  const refreshProductList = async () => {
    setProducts(await getProducts());
  };

  const [nameFilter, setNameFilter] = useState({
    property: "name",
    comparison: "contains",
    value: "",
  } as Filter);

  useEffect(() => {
    refreshProductList();
  }, []);

  let productList: JSX.Element[] = [];

  const dispatch: Dispatch<any> = useDispatch();

  const saveProduct = React.useCallback(
    (product: Product) => dispatch(increase(product)),
    [dispatch]
  );

  const handleSubmit = (event: any) => {
    setLoading(<LoadingOverlay></LoadingOverlay>);
    event.preventDefault();
    const filters = typeFilter ? [typeFilter] : [];
    console.log(filters);
    getProducts(filters).then((products) => {
      setLoading(<div></div>);

      //^.*DEF.*$ --> checkea contiene substring DEF

      var productsMatching: Product[] = [];
      const unorderedProducts = products as Product[];

      unorderedProducts.forEach((product) => {
        if (
          (product.name as string)
            .toLocaleLowerCase()
            .includes(nameFilter.value.toLocaleLowerCase()) ||
          (product.title as string)
            .toLocaleLowerCase()
            .includes(nameFilter.value.toLocaleLowerCase())
        ) {
          productsMatching.push(product);
        }
      });

      let orderedProducts = productsMatching.sort((a, b) => sortByName(a, b));
      if (sorting === "price")
        orderedProducts = productsMatching.sort((a, b) => sortByPrice(a, b));

      setProducts(orderedProducts);
    });
  };

  const sortByName = (a: Product, b: Product) => {
    if (a.name! < b.name!) {
      return -1;
    }
    if (a.name! > b.name!) {
      return 1;
    }
    return 0;
  };

  const sortByPrice = (a: Product, b: Product) => {
    return a.price - b.price;
  };

  const handleSortingOption = (e: any) => {
    setSorting(e.currentTarget.value);
  };
  const handleTypeFilter = (e: any) => {
    if (e.currentTarget.value === "any") {
      setTypeFilter(null);
    } else {
      setTypeFilter({
        property: "category",
        comparison: "==",
        value: e.currentTarget.value,
      } as Filter);
    }
  };

  const handleNameFilter = (event: any) => {
    setNameFilter({ ...nameFilter, value: event.currentTarget.value });
  };

  products.forEach((product) => {
    productList.push(
      <div className={styles.product}>
        <CardItem product={product} saveProductToCart={saveProduct}></CardItem>
      </div>
    );
  });

  return (
    <>
      <TopMenu></TopMenu>
      <HeaderBackground></HeaderBackground>
      {loading}
      <div className={styles.container}>
        <div className={styles.header}>
          <div title={"ShopTitle"} className={styles.title}></div>
          <div className={styles.subtitle}></div>
        </div>
        <form className={styles.bodycontainer} onSubmit={handleSubmit}>
          <div className={styles.filtersrow}>
            <div className={styles.filter}>
              <b>Type</b>
              <hr></hr>
              <select title={"select"} onChange={handleTypeFilter}>
                <option value="any">Any</option>
                <option value="health">Health</option>
                <option value="tech">Tech</option>
              </select>
            </div>
          </div>
          <div className={styles.productsrow}>
            <div className={styles.productsheader}>
              <b>Openning offer</b>
              <span>
                Everything <strong>20% off</strong>
              </span>
              <img src={headerImg}></img>
            </div>
            <hr></hr>
            <div className={styles.searchbar}>
              <input
                title={"searchProduct"}
                type="text"
                placeholder="Search your product here..."
                onChange={handleNameFilter}
              ></input>
              <div className={styles.searchordercontainer}>
                <b>Order by</b>
                <select
                  title={"orderBySelector"}
                  onChange={handleSortingOption}
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                </select>
              </div>
              <button title={"searchButton"} onClick={handleSubmit}>
                <b>Search</b>{" "}
              </button>
            </div>

            <hr style={{ marginTop: "0.4rem" }}></hr>
            <div title={"products"} className={styles.productcardcontainer}>
              {" "}
              {productList}
            </div>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ShopPage;
