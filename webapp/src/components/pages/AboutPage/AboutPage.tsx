import TopMenu from "../../menu/TopMenu";
import styles from "./AboutPage.module.scss";

function AboutPage(): JSX.Element {
  return (
    <>
      <TopMenu></TopMenu>
      <iframe
        className={styles.iframecontainer}
        src="https://arquisoft.github.io/dede_en3a/"
      ></iframe>
    </>
  );
}

export default AboutPage;
