import {
  getSolidDataset,
  getStringNoLocale,
  getThing,
  Thing,
  getUrl,
} from "@inrupt/solid-client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { VCARD } from "@inrupt/vocab-common-rdf";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DedeStore } from "../../../redux/store";
import { calculateDeliveryOnCall } from "../../../../functions/src";

import { getFunctions, httpsCallable } from "firebase/functions";
import { functions } from "../../../utils/firebase";
import styles from "./ShowPodInformation.module.scss";
import {getCurrentUser, useAuth} from "../../../context/AuthContext";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import { Dispatch } from "redux";
import { setEstimatedDelivery, setShippingCosts } from "../../../redux/actions";
import { Address } from "../../../api/model/pod/address";
import { AddressCalculator } from "./AddressCalculator";
import Modal from "../../Modal/Modal";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { setCookie } from "../../../context/Cookies";
import { getCookie } from "../../../context/Cookies";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import LoginPage from "../../pages/LoginPage/LoginPage";

type PODProps = {
  webID: string;
};

/**
 * This function is responsible for getting the address of a person given
 * the webID as parameter. What it does is to get the url of your profile card,
 * then it gets the dataset of your profile. It access to your ID related with your address and finally
 * returns an string of your address.
 * @param webID
 */

function cost(cost: number) {
  if (cost != 0) {
    return (
      <div className={styles.infocontainer}>
        <Box component="h3" id={"deliveryComponent"}>
          Delivery cost: {cost} $
        </Box>
      </div>
    );
  }
}

function ShowPodInformation(props: PODProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();

  const setShippingCost = React.useCallback(
    (shippingCosts: number) => dispatch(setShippingCosts(shippingCosts)),
    [dispatch]
  );
  const setEstimatedDeliveryDate = React.useCallback(
    (estimatedDelivery: number) =>
      dispatch(setEstimatedDelivery(estimatedDelivery)),
    [dispatch]
  );

  const cart = useSelector((state: DedeStore) => state.cart);


  const [loginPage, setLoginPage] = useState(<div></div>);
  const [registerPage, setRegisterPage] = useState(<div></div>);

  const [address, setAddress] = React.useState<Address>();
  const [delCost, setDelCost] = React.useState(0);

  const [loadingOverlay, setLoadingOverlay] = React.useState(<div></div>);

  const [addresses, setAddresses] = React.useState([]);
  const [listOfAddress, setListOfAddress] = React.useState<Address[]>([]);

  const [orderModal, setOrderModal] = React.useState(<></>);

  const orderModalHtml = (
    <div className={styles.sucessfulorder}>
      <div className={styles.title}>Your order was sucessful!</div>
      <div className={styles.subtitle}>
        You can see the state of your orders in your account{" "}
      </div>
      <div className={styles.accept} onClick={() => setOrderModal(<></>)}>
        Accept
      </div>
    </div>
  );

  const loginPageProps = {
    onExit: () => setLoginPage(<div></div>),
    onRegisterClick: () => {
      setLoginPage(<div></div>);
      setRegisterPage(
          <RegisterPage
              onExit={() => setRegisterPage(<div></div>)}
          ></RegisterPage>
      );
    },
    onLoginSuccess: () => {setLoginPage(<div></div>); setRegisterPage(<div></div>); setOrderModal(<></>)},
  };


  const loginModal = (<LoginPage {...loginPageProps}></LoginPage>);

  const emptyCartErrorModal = (

      <div className={styles.modalerror}>
        <div className={styles.title}>Sorry, cannot proceed with an empty cart...</div>
        <div className={styles.title}>
          Add some products to your cart.
        </div>
        <div className={styles.accept} onClick={() => setOrderModal(<></>)}>
          Accept
        </div>
      </div>

  );


  const notEnoughDataPodErrorModal = (

      <div className={styles.modalerror}>
        <div className={styles.title}>Sorry, cannot proceed...</div>
        <div className={styles.title}>
          There is not enough information in the pod for calculate shipping.
        </div>
        <div className={styles.accept} onClick={() => setOrderModal(<></>)}>
          Accept
        </div>
      </div>


  );


  const paypalModalMenu = (

      <>
      <PayPalButtons
          createOrder={(data: any, actions: any) => {
            return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "EUR",
                        value: getCookie("totalCartAndShipping"),
                      },
                    },
                  ],
                })
                .then((orderId: any) => {

                  // Your code here after create the order
                  return orderId;
                });
          }}
          onApprove={async (data: any, actions: any) => {
            return actions.order.capture().then(function () {
              setOrderModal(<></>)
              // Your code here after capture the order
              buy();
            });
          }}
      />

        <div className={styles.cancel} onClick={() => setOrderModal(<></>)}>
          Cancel
        </div>
      </>


  );

  const currentUser = useAuth().getCurrentUser();
  const userRegistered = () => {
    return currentUser !== null;
  };

  //OBTENEMOS POR CADA WEB ID LA LISTA DE ADDRESSES ASOCIADOS
  useEffect(() => {

    const fullAddresses = AddressCalculator(props.webID);
    const addressesHtml: any = [];
    setLoadingOverlay(<LoadingOverlay></LoadingOverlay>);
    fullAddresses.then((full: Address[]) => {
      console.log(full);
      full.forEach((ind) => {
        const htmlOption = <option value={ind.address}> {ind.address} </option>;
        addressesHtml.push(htmlOption);
      });

      console.log("2" + addressesHtml);
      setAddresses(addressesHtml);
      setAddress(full[0]);
      setListOfAddress(full);
      setLoadingOverlay(<></>);

      setCookie("address", full[0].address,1);
      setCookie("city", full[0].city,1);
      setCookie("country", full[0].country,1);
      setCookie("region", full[0].region,1);
      setCookie("postalcode", full[0].postalcode,1);

      calcShipping()

    }
    );
  }, [props.webID]);
  const navigate = useNavigate();

  async function calcWithFirebaseFunction(
    address: string,
    postalcode: string,
    city: string,
    country: string,
    region: string
  ): Promise<{ message: string; cost: number } | void> {
    const calculateDeliveryOnCall = httpsCallable(
      functions,
      "calculateDeliveryOnCall"
    );
    setLoadingOverlay(<LoadingOverlay></LoadingOverlay>);
    calculateDeliveryOnCall({
      address: address,
      postalcode: postalcode,
      city: city,
      country: country,
      region: region,
    })
      .then((response) => {
        setLoadingOverlay(<></>);
        console.log(response);
        let result = response.data as any;
        console.log(result);
        setShippingCost(result.cost);
        setEstimatedDeliveryDate(result.estimatedDelivery);
        setDelCost(result.cost);
        return { message: result.message, cost: result.cost };
      })
      .catch((error: Error) => {
        setLoadingOverlay(<div></div>);
        alert("Something went wrong while calculating your shipping cost");
      });
  }

  async function calcShipping() {

    console.log("CALCULANDO")

    if(getCookie("address") == "") {
      alert("Sorry but your address has not an street address associated with it." +
          " Revise your pod data");
      return;
    }

    if(getCookie("postalcode") == "") {
      alert("Sorry but your address has not a postal code associated with it. " +
          "Revise your pod data");
      return;
    }

    if(getCookie("city") == "") {
      alert("Sorry but your address has not a city associated with it. " +
          "Revise your pod data");
      return;
    }

    if(getCookie("country") == "") {
      alert("Sorry but your address has not a country associated with it. " +
          "Revise your pod data");
      return;
    }

    if(getCookie("region") == "") {
      alert("Sorry but your address has not a region associated with it. " +
          "Revise your pod data");
      return;
    }

    let response : void | {message: string, cost: number} = await calcWithFirebaseFunction(
      getCookie("address"),
        getCookie("postalcode"),
        getCookie("city"),
        getCookie("country"),
        getCookie("region")
    );

    let shipCost = "";
    //to check response is not void
    if(response instanceof  Object){
      shipCost = response.cost.toString();
    }

    setCookie("shippingCost",shipCost,1)

    return response;
  }


  function setterOfAddress(value: any) {
    const finalVal = listOfAddress.filter(
      (addr) => addr.address === value.target.value
    )[0];
    setAddress(finalVal);

    setCookie("address", finalVal.address,1);
    setCookie("city", finalVal.city,1);
    setCookie("country", finalVal.country,1);
    setCookie("region", finalVal.region,1);
    setCookie("postalcode", finalVal.postalcode,1);

    calcShipping()

  }

  const add = async () => {
    setLoadingOverlay(<LoadingOverlay></LoadingOverlay>);

    if (cart.length == 0) {
      alert("Oh, you are doing an empty order, that is not allowed :(");
      return;
    }

    console.log("ITEMS BEING SENT TO SEND ORDER FUNCTIONS", cart);
    const sendOrder = httpsCallable(functions, "sendOrder");

    return await sendOrder({
      items: cart,
      user: currentUser?.email,
      addressData: {
        address: getCookie("address"),
        postalcode: getCookie("postalcode"),
        city: getCookie("city"),
        country: getCookie("country"),
        region: getCookie("region"),
      },
    })
      .then(() => {
        setLoadingOverlay(<></>);

        setOrderModal(<Modal element={orderModalHtml}></Modal>);
      })
      .catch((error: any) => {
        setLoadingOverlay(<></>);
        console.log("catch error", error.message);
        alert(error);
      });
  };

  const buy = () => {
    if (userRegistered()) {

      add()
        .then(() => {})
        .catch((error: Error) => {
          setLoadingOverlay(<div></div>);
          alert("OHOH, SOMETHING WENT WRONG: " + error.message);
        });
    } else {
      setLoginPage(<LoginPage {...loginPageProps}></LoginPage>);
    }
  };


  function canCheckout(){

    if(cart.length == 0){
      setOrderModal(<Modal element={emptyCartErrorModal}></Modal>)

    }
    else if(!userRegistered()){
      setOrderModal(<Modal element={loginModal}></Modal>)

  //IF USER IS LOGED IN AND NON-EMPTY CART --> RENDER PAYPAL BUTTONS
    }else if (getCookie("address") == "" ||
              getCookie("postalcode") == "" ||
              getCookie("city") == "" ||
              getCookie("country") == "" ||
              getCookie("region") == ""){
      setOrderModal(<Modal element={notEnoughDataPodErrorModal}></Modal>)
    }
    else{


        let shipCost  = Number(getCookie("shippingCost"))
        let cartCost = 0;
        for(let i = 0; i< cart.length; i++){
          cartCost += cart[i].amount + cart[i].product.price;
      }
      setCookie("totalCartAndShipping",(shipCost+cartCost)+"",1)
      setOrderModal(<Modal element={paypalModalMenu}></Modal>);

    }

  }


  return (
    <>
      {loginPage}
      {console.log(getCookie("city"))}
      <Grid container>
        {loadingOverlay}
        {orderModal}
        <Grid>
          <div className={styles.infocontainer}>
            <form>
              <select
                className={styles.comboboxcontainer}
                id="addreses"
                onChange={setterOfAddress}
              >
                {addresses}
              </select>
            </form>

            <Box component="h3" id={"addressComponent"}>
              Address: {getCookie("address") != ""? getCookie("address"):"none"}
            </Box>
            <Box component="h3" id={"postalcodeComponent"}>
              Postal Code: {getCookie("postalcode") != ""? getCookie("postalcode"):"none"}
            </Box>
            <Box component="h3" id={"cityComponent"}>
              Locality: {getCookie("city") != ""? getCookie("city"):"none"}
            </Box>
            <Box component="h3" id={"countryComponent"}>
              Country: {getCookie("country") != ""? getCookie("country"):"none"}
            </Box>
            <Box component="h3" id={"regionComponent"}>
              Region: {getCookie("region") != ""? getCookie("region"):"none"}
            </Box>
          </div>

          <div className={styles.buttonsPODinternal}>
            <button type={"submit"} className={styles.buy} onClick={canCheckout}>
              Checkout
            </button>

          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default ShowPodInformation;
