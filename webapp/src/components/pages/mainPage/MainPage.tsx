import styles from "./MainPage.module.scss";
import TopMenu from "../../menu/TopMenu";

type MainPageProps = {};

function MainPage(): JSX.Element {
  return (
    <>
      <TopMenu></TopMenu>

      <div className={styles.headercontainer}>
        <div className={styles.header}>
          <div className={styles.title}>Dede</div>
          <div className={styles.subtitle}>
            A decentralized ecommerce website.
          </div>
          <div className={styles.text}>
            Innovational use of Solid Pods in order to make our deliveries more
            private.
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
