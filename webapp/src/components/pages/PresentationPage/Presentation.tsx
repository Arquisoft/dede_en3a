import TopMenu from "../../menu/TopMenu";
import styles from "./Presentation.module.scss";

function Presentation(): JSX.Element {
  return (
    <>
      <TopMenu></TopMenu>
      <iframe
        className={styles.iframecontainer}
        src="https://prezi.com/embed/akasflfse7m0/"
      ></iframe>
    </>
  );
}

export default Presentation;
