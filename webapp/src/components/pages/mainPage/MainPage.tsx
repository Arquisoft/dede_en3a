import styles from "./MainPage.module.scss";
import TopMenu from "../../menu/TopMenu";
import { display } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ParallaxItem from "../../ParallaxItem/ParallaxItem";

type MainPageProps = {};

function MainPage(): JSX.Element {
  const [transparent, setTransparent] = useState(styles.showmore);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []); //Will only be called once upon initialization

  function handleScroll(event: any) {
    if (window.scrollY !== 0) {
      setTransparent(styles.noopacity);
    } else {
      setTransparent(styles.reappear);
    }
  }

  return (
    <>
      <TopMenu alwaysOpaque={true}></TopMenu>

      <div className={styles.container}>
        <div className={styles.background}>
          <img src="https://images.pexels.com/photos/296323/pexels-photo-296323.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></img>
        </div>

        <div className={styles.title}>
          <b>Dede</b>, a decentralized ecommerce website
        </div>

        <div className={styles.subtitle}>
          Innovational use of Solid Pods in order to make our deliveries more
          private.
        </div>

        {/* <div className={styles.showmore + " " + transparent}>
          <b>See more</b>
          <span className="material-icons">expand_more</span>
        </div> */}
        <div
          title={"startShopping"}
          className={styles.ourproducts}
          onClick={() => navigate("/shop")}
        >
          <b>Start shopping</b>
        </div>

        <div className={styles.topfade}></div>
        <div className={styles.how}>
          <div className={styles.doubts}>?</div>
          <div className={styles.doubtstitle}>
            <b>How does it work?</b>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.steptitle}>
                <b>First,</b> choose your products
              </div>
              <div className={styles.steptext}>
                Choose between our wide array of available products, from
                medical items to technological gadgets. Once you have found your
                desired products, proceed to checkout.
              </div>
              <span className="material-icons">shopping_bag</span>
            </div>
            <div className={styles.step}>
              <div className={styles.steptitle}>
                <b>Then,</b> use your POD WebId
              </div>
              <div className={styles.steptext}>
                In order to proceed with the checkout, you will have to
                introduce your solid POD WebId.
              </div>
              <div className={styles.steptext}>
                We support four solid pod providers. Solid Community, Solid Web,
                Inrupt.net and pod.Inrupt.com.
              </div>
              <span className="material-icons">face</span>
            </div>
            <div className={styles.step}>
              <div className={styles.steptitle}>
                <b>Lastly,</b> select your delivery adress.
              </div>
              <div className={styles.steptext}>
                All of your personal data will be contained inside your pod. You
                can choose your address, you may have more than one and then
                proceed with the payment.
              </div>
              <span className="material-icons">home</span>
            </div>
          </div>
        </div>
        <div className={styles.bottomfade}></div>

        {/* <div className={styles.linkimages}>
          <div className={styles.linkimagecontainer}>
            <img src="https://images.pexels.com/photos/953864/pexels-photo-953864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></img>
          </div>
          <div className={styles.linkimagecontainer}>
            <img src="https://images.pexels.com/photos/953864/pexels-photo-953864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></img>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default MainPage;
