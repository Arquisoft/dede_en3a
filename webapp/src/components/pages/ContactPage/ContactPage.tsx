import TopMenu from "../../menu/TopMenu";
import styles from "./ContactPage.module.scss";

function ContactPage(): JSX.Element {
  return (
    <>
      <TopMenu></TopMenu>
      <div className={styles.headercontainer}>
        <div className={styles.header}>
          <div className={styles.title}>Contact</div>
          <div className={styles.subtitle}>
            <img
              src={"https://logodix.com/logo/1288191.png"}
              width={"50"}
              height={"50"}
            />
            <p>Email: dedeen3a@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
