import ParallaxItem from "../ParallaxItem/ParallaxItem";
import styles from "./HeaderBackground.module.scss";

function HeaderBackground(): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <ParallaxItem
          item={<div className={styles.fade}></div>}
          parallaxFactor={0.8}
        ></ParallaxItem>
        {/* <div className={styles.leftimgcontainer}>
          <ParallaxItem
            item={
              <img src="https://previews.dropbox.com/p/thumb/ABe2j9reR8ByJq_6cHqN-I2J2cSvqMPVY5FvPjLNGqXa40xhhj6YW3euA5W7zEvcfupexTCx62r3SrISFmE3Wur3vhrhUCN03PjkryKFx3Uxsrnh3N7SiEBr_ObX6ssPvrt3PlM-QQfrayxKhmuNWyp4Uvfs3wSaeSKeK5Oo_QjoNq_ebwEb7bqr5a5OrB_MG4HaSJNqAz2NaVuH1IA0kFLgqa_lG1fUNmO8lRPUySPEq8qG4QC64m6NGDUmVvrQFNN61NUhM7orfa8TC06x7QtPEZ0Z_d_6c5VV4L2szsFWbOP2fn8jUKMJ9YvUHl0hRvGq3h1XZ0yF6lYEmzn0VJ5IGARDOBlLmgsajji-MHUUsKgqhg-vDaGYYw-6MZDoFRA/p.png"></img>
            }
            parallaxFactor={0.6}
          ></ParallaxItem>
        </div> */}
      </div>
    </>
  );
}

export default HeaderBackground;
