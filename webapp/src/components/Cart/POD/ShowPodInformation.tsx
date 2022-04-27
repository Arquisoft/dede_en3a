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
import { useAuth } from "../../../context/AuthContext";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import { Dispatch } from "redux";
import { setShippingCosts } from "../../../redux/actions";
import { Address } from "../../../api/model/pod/address";
import { AddressCalculator } from "./AddressCalculator";
import Modal from "../../Modal/Modal";

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

  const cart = useSelector((state: DedeStore) => state.cart);

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
    });
  }, []);
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
        setDelCost(result.cost);
        return { message: result.message, cost: result.cost };
      })
      .catch((error: Error) => {
        alert("Something went wrong while calculating your shipping cost");
      });
  }

  async function calcShipping() {
    if (
      address == null ||
      typeof address == undefined ||
      address.postalcode == null ||
      typeof address.postalcode == undefined ||
      address.city == null ||
      typeof address.city == undefined ||
      address.country == null ||
      typeof address.country == undefined ||
      address.region == null ||
      typeof address.region == undefined
    ) {
      alert(
        "PLEASE, ENTER A POD WITH address, postal code, city, country and region"
      );
      return;
    }

    let response = await calcWithFirebaseFunction(
      address.address,
      address.postalcode,
      address.city,
      address.country,
      address.region
    );
  }

  const add = async () => {
    setLoadingOverlay(<LoadingOverlay></LoadingOverlay>);

    if (cart.length == 0) {
      alert("Oh, you are doing an empty order, that is not allowed :(");
      return;
    }

    console.log("ITEMS BEING SENT TO SENDORDER FUNCTIONS", cart);
    const sendOrder = httpsCallable(functions, "sendOrder");

    return await sendOrder({
      items: cart,
      user: currentUser?.email,
      addressData: {
        address: address?.address,
        postalcode: address?.postalcode,
        city: address?.city,
        country: address?.country,
        region: address?.region,
      },
    })
      .then(() => {
        setLoadingOverlay(<></>);

        setOrderModal(<Modal element={orderModalHtml}></Modal>);
      })
      .catch((error: any) => {
        console.log("catch error", error.message);
        alert(error);
      });
  };
  const buy = () => {
    if (userRegistered()) {
      add()
        .then(() => {})
        .catch((error: Error) => {
          alert("OHOH, SOMETHING WENT WRONG: " + error.message);
        });
    } else {
      navigate("/login");
    }
  };

  function setterOfAddress(value: any) {
    const finalVal = listOfAddress.filter(
      (addr) => addr.address === value.target.value
    )[0];
    setAddress(finalVal);
  }

  return (
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
            Address: {address?.address}
          </Box>
          <Box component="h3" id={"postalcodeComponent"}>
            Postal Code: {address?.postalcode}
          </Box>
          <Box component="h3" id={"cityComponent"}>
            Locality: {address?.city}
          </Box>
          <Box component="h3" id={"countryComponent"}>
            Country: {address?.country}
          </Box>
          <Box component="h3" id={"regionComponent"}>
            Region: {address?.region}
          </Box>
        </div>
        <div className={styles.buttonsPODinternal}>
          <button onClick={calcShipping}> Calculate shipping </button>
        </div>
        {cost(delCost)}
        <div className={styles.buttonsPODinternal}>
          <button type={"submit"} className={styles.buy} onClick={buy}>
            Checkout
          </button>
        </div>
      </Grid>
    </Grid>
  );
}

export default ShowPodInformation;
