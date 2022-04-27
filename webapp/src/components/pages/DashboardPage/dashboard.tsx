import styles from "./dashboard.module.scss";
import { useAuth } from "../../../context/AuthContext";
import TopMenu from "../../menu/TopMenu";
import Modal from "../../Modal/Modal";

export function Dashboard() {
  const { getCurrentUser } = useAuth();

  const testItem = <div className={styles.testdiv}></div>;
  const clickLog = () => {
    console.log("clicked outside");
  };

  return (
    <>
      <TopMenu></TopMenu>
      <Modal element={testItem} onClickOutside={clickLog}></Modal>
      <div className={styles.loginpagecontainer}>
        <h1>DASHBOARD</h1>
        <br />
        <p>You are logged in as: </p>
        <br />
        <p>{getCurrentUser()?.email}</p>
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
