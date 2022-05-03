import styles from "./Footer.module.scss";
import { useAuth } from "../../../context/AuthContext";
import TopMenu from "../../menu/TopMenu";
import Modal from "../../Modal/Modal";

export function Footer(): JSX.Element {
  const { getCurrentUser } = useAuth();

  return (
    <>
      <div className={styles.container}></div>
    </>
  );
}
