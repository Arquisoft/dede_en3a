import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import "./MainPage.scss";
import CardItem from "../../CardItem/CardItem";

type MainPageProps = {};

function MainPage(): JSX.Element {
  const item1 = {
    name: "Uno",
    img: "https://irecetasfaciles.com/wp-content/uploads/2019/08/pizza-de-jamon-queso-y-tocino.jpg",
  };
  const item2 = {
    name: "Dos",
    img: "https://irecetasfaciles.com/wp-content/uploads/2019/08/pizza-de-jamon-queso-y-tocino.jpg",
  };
  const item3 = {
    name: "Tres",
    img: "https://irecetasfaciles.com/wp-content/uploads/2019/08/pizza-de-jamon-queso-y-tocino.jpg",
  };
  const item4 = {
    name: "Cuatro",
    img: "https://irecetasfaciles.com/wp-content/uploads/2019/08/pizza-de-jamon-queso-y-tocino.jpg",
  };

  return (
    <>
      <div className="header-container">
        <div className="header">
          <div className="title">Dede</div>
          <div className="subtitle">A decentralized ecommerce website.</div>
        </div>
        <div className="product-card-container">
          <CardItem product={item1}></CardItem>
          <CardItem product={item2}></CardItem>
          <CardItem product={item3}></CardItem>
          <CardItem product={item4}></CardItem>
        </div>
      </div>
    </>
  );
}

export default MainPage;
