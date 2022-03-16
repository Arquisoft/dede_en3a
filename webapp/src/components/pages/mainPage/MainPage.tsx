import "./MainPage.scss";
import TopMenu from "../../menu/TopMenu";

type MainPageProps = {};

function MainPage(): JSX.Element {

  return (
    <>
      <TopMenu></TopMenu>

      <div className="header-container">
        <div className="header">
          <div className="title">Dede</div>
          <div className="subtitle">A decentralized ecommerce website.</div>
          <div className="text">Innovational use of Solid Pods in order to make our deliveries more private.</div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
