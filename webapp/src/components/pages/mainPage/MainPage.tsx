import "./MainPage.scss";
import CardItem from "../../CardItem/CardItem";

type MainPageProps = {};

function MainPage(): JSX.Element {
  const item1 = {
    name: "Balón",
    img: "https://i8.amplience.net/t/jpl/jdes_product_list?plu=jd_500507_bl&qlt=92&w=363&h=363&v=1&fmt=auto",
    price: 120,
  };
  const item2 = {
    name: "Gorra",
    img: "https://i8.amplience.net/t/jpl/jdes_product_list?plu=jd_562055_bl&qlt=92&w=363&h=363&v=1&fmt=auto",
    price: 220,
  };
  const item3 = {
    name: "Mochila",
    img: "https://i8.amplience.net/t/jpl/jdes_product_list?plu=jd_571269_bl&qlt=92&w=363&h=363&v=1&fmt=auto",
    price: 40,
  };
  const item4 = {
    name: "Guantes",
    img: "https://i8.amplience.net/t/jpl/jdes_product_list?plu=jd_571266_bl&qlt=92&w=363&h=363&v=1&fmt=auto",
    price: 20,
  };

  return (
    <>
      <div className="header-container">
        <div className="header">
          <div className="title">Dede</div>
          <div className="subtitle">A decentralized ecommerce website.</div>
        </div>
        <div className="product-card-container">
          <div className="product1">
            <CardItem product={item1}></CardItem>
          </div>
          <div className="product2">
            <CardItem product={item2}></CardItem>
          </div>
          <div className="product3">
            <CardItem product={item3}></CardItem>
          </div>
          <div className="product4">
            <CardItem product={item4}></CardItem>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
