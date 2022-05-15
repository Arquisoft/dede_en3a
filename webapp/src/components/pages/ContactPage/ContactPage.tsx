import TopMenu from "../../menu/TopMenu";
import styles from "./ContactPage.module.scss";

function ContactPage(): JSX.Element {
  return (
    <>
      <TopMenu></TopMenu>
      <div className={styles.headercontainer}>
        <div className={styles.header}>
          <div title={"contactTitle"} className={styles.title}>
            Contact
          </div>
          <div className={styles.subtitle}>
            <div className={styles.row}>
              <img
                title={"contactImage"}
                src={"https://logodix.com/logo/1288191.png"}
                width={"50"}
                height={"50"}
                alt="mail"
              />
              <p>Email: dedeen3a@gmail.com</p>
            </div>
            <div className={styles.row}>
              <img
                src={"https://logodix.com/logo/1288191.png"}
                width={"50"}
                height={"50"}
                alt="mail"
              />
              <span>Email: bestdedeteam@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
