import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import "./MainPage.scss";

type MainPageProps = {};

function MainPage(): JSX.Element {
  return (
    <>
      <div className="header-container">
        <div className="header">
          <div className="title">Dede</div>
          <div className="subtitle">A decentralized ecommerce website.</div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
