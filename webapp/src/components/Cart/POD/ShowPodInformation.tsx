import {
    getSolidDataset, getStringNoLocale, getThing, Thing, getUrl
} from "@inrupt/solid-client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import {VCARD} from "@inrupt/vocab-common-rdf";
import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { DedeStore } from "../../../redux/store";
import {calculateDeliveryOnCall} from "../../../../functions/src";

import {getFunctions, httpsCallable} from "firebase/functions";

import "./ShowPodInformation.scss"
import {useAuth} from "../../../context/AuthContext";
import {Address} from "../../../api/model/pod/address";



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



async function retrievePODAddress(webID: string): Promise<string> {
    let profileDocumentURI = webID.split("#")[0]
    let myDataSet = await getSolidDataset(profileDocumentURI)
    let profile = getThing(myDataSet, webID)
    let urlAddress = getUrl(profile as Thing, VCARD.hasAddress) as string
    let addressProfile = await getThing(myDataSet, urlAddress)
    let address = getStringNoLocale(addressProfile as Thing, VCARD.street_address) as string
    return address
}

async function retrievePODPostalCode(webID: string): Promise<string> {
    let _profileDocumentURI = webID.split("#")[0]
    let _myDataSet = await getSolidDataset(_profileDocumentURI)
    let _profile = getThing(_myDataSet, webID)
    let _urlAddress = getUrl(_profile as Thing, VCARD.hasAddress) as string
    let _addressProfile = await getThing(_myDataSet, _urlAddress)
    let postalCode = getStringNoLocale(_addressProfile as Thing, VCARD.postal_code) as string
    return postalCode
}

async function retrievePODCity(webID: string): Promise<string> {
    let __profileDocumentURI = webID.split("#")[0]
    let __myDataSet = await getSolidDataset(__profileDocumentURI)
    let __profile = getThing(__myDataSet, webID)
    let __urlAddress = getUrl(__profile as Thing, VCARD.hasAddress) as string
    let __addressProfile = await getThing(__myDataSet, __urlAddress)
    let city = getStringNoLocale(__addressProfile as Thing, VCARD.locality) as string
    return city
}

async function retrievePODCountry(webID: string): Promise<string> {
    let __profileDocumentURI = webID.split("#")[0]
    let __myDataSet = await getSolidDataset(__profileDocumentURI)
    let __profile = getThing(__myDataSet, webID)
    let __urlAddress = getUrl(__profile as Thing, VCARD.hasAddress) as string
    let __addressProfile = await getThing(__myDataSet, __urlAddress)
    let country = getStringNoLocale(__addressProfile as Thing, VCARD.country_name) as string
    return country
}

async function retrievePODRegion(webID: string): Promise<string> {
    let __profileDocumentURI = webID.split("#")[0]
    let __myDataSet = await getSolidDataset(__profileDocumentURI)
    let __profile = getThing(__myDataSet, webID)
    let __urlAddress = getUrl(__profile as Thing, VCARD.hasAddress) as string
    let __addressProfile = await getThing(__myDataSet, __urlAddress)
    let region = getStringNoLocale(__addressProfile as Thing, VCARD.region) as string
    console.log("LA REGION ES "+ region)
    return region
}

function cost(cost : number) {
    if(cost != 0){
        return (
            <div className={"info-container"}>
                <Box component="h3" id={"deliveryComponent"}>Delivery cost: {cost} $</Box>
            </div>
        );
    }
}




function ShowPodInformation(props: PODProps): JSX.Element {
    const cart = useSelector((state: DedeStore) => state.cart);

    //MANTENEMOS ESTO, ES UTIL PARA LA HORA DE RECIBIR VARIAS ADDRESES Y SELECCIONAR UNA
    let [address, setAddress] = React.useState("");
    const [postalCode, setPostalCode]= React.useState("");
    const [city, setCity] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [region, setRegion] = React.useState("");
    const [delCost, setDelCost] = React.useState(0);

    //MODIFIQUE ESTO PARA QUE SE PUEDA ELEGIR LA WEBID DINAMICAMENTE
    const getPODAddress = async (id : string) => setAddress(await retrievePODAddress(id));
    const getPODPostalCode = async (id : string) => setPostalCode(await retrievePODPostalCode(id))
    const getPODCity = async (id : string) => setCity(await retrievePODCity(id))
    const getPODCountry = async (id : string) => setCountry(await retrievePODCountry(id));
    const getPODRegion = async (id : string) => setRegion(await retrievePODRegion(id));


    const currentUser = useAuth().getCurrentUser();
    const userRegistered = () => {
        return currentUser !== null;
    };

    const [listOfPODAddresses, setListOfPODAddresses] = useState<Address[]>([]);
    const [listOfWebID, setListOfWebID] = useState<string[]>([]);

    //DE PRUEBA HASTA Q TENGAMOS LAS WEBID DE LOS PODS
    const idParaPrueba : string[] = [];
    idParaPrueba.push(props.webID);
    setListOfWebID(idParaPrueba);

    //OBTENEMOS POR CADA WEB ID LA LISTA DE ADDRESSES ASOCIADOS
    useEffect(() => {
        const adrs : Address[] = [];
        listOfWebID.forEach((id) =>{
            getPODAddress(id);
            getPODPostalCode(id);
            getPODCity(id);
            getPODCountry(id);
            getPODRegion(id);
             adrs.push({
                address : address,
                postalcode : postalCode,
                city : city,
                country : country,
                region : region
            });
        });
        setListOfPODAddresses(adrs);
        console.log("LISTA DE PODS PROCESADOS")
        console.log(listOfPODAddresses);
    })
    const navigate = useNavigate();


    async function calcWithFirebaseFunction (address : string, postalcode:string,city:string,country:string,region:string)
        : Promise<{ message: string, cost: number } | void> {





            const calculateDeliveryOnCall = httpsCallable(getFunctions(), 'calculateDeliveryOnCall');

            calculateDeliveryOnCall({
                address: address,
                postalcode: postalcode,
                city : city,
                country: country,
                region: region
            }).then((response  )=>{

                console.log(response)
                let result  = response.data;
                console.log(result);
                // @ts-ignore
                //alert("Your shipping will cost: " + result.cost + "$");
                // @ts-ignore
                setDelCost(result.cost);
                console.log(delCost)
               // @ts-ignore
                return  {message: result.message , cost : result.cost};
            }).catch((error:Error)=>{
                alert("Something went wrong while calculating your shipping cost");
            });




    }



    async function calcShipping() {



        if(address == null || typeof (address) == undefined
            || postalCode == null || typeof (postalCode) == undefined
            || city == null || typeof (city) == undefined
            || country == null || typeof (country) == undefined
            || region == null || typeof (region) == undefined){

            alert("PLEASE, ENTER A POD WITH address, postal code, city, country and region");
            return;
        }


        let response = await calcWithFirebaseFunction(address,postalCode,city,country,region);

    };


    const  add = async () => {

        if(cart.length == 0){
            alert("Oh, you are doing an empty order, that is not allowed :(");
            return;
        }


        const sendOrder = httpsCallable(getFunctions(), 'sendOrder');

        return await sendOrder({
            items:cart,
            user:currentUser?.email,
            addressData:{
                address: address,
                postalcode: postalCode,
                city : city,
                country: country,
                region: region
            }
        })
            .then(( ) => {
                alert("Your order has been processed.");

            }).catch(()=>{

                alert("Sorry, we are suffering technical problems, try again...");


            });

    }
    const buy = () => {
        if (userRegistered()) {

            add().then(()=>{



            }).catch((error : Error)=>{

                alert("OHOH, SOMETHING WENT WRONG: " + error.message);

            });

        } else {
            navigate("/login");
        }
    };


    return (
        <Grid container>
            <Grid>
                <div className={"info-container"}>
                    <select className={"combobox-container"} id="cars">

                        <option value="volvo">Volvoassdadsadadasd</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>

                    <Box component="h3" id={"addressComponent"}>Address: {address}</Box>
                    <Box component="h3" id={"postalcodeComponent"}>Postal Code: {postalCode}</Box>
                    <Box component="h3" id={"cityComponent"}>Locality: {city}</Box>
                    <Box component="h3" id={"countryComponent"}>Country: {country}</Box>
                    <Box component="h3" id={"regionComponent"}>Region: {region}</Box>
                </div>
                <div className="buttonsPOD-internal">
                    <button  onClick={calcShipping}> Calculate shipping </button>
                </div>
                {
                    cost(delCost)
                }
                <div className="buttonsPOD-internal">
                    <button type={"submit"} className="buy" onClick={buy}>
                        Checkout
                    </button>
                </div>
            </Grid>

        </Grid>
    );
}

export default ShowPodInformation;