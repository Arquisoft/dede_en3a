import {
    getSolidDataset, getStringNoLocale, getThing, Thing, getUrl
} from "@inrupt/solid-client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import {VCARD} from "@inrupt/vocab-common-rdf";
import React, {useEffect} from "react";

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



function ShowPodInformation(props: PODProps): JSX.Element {
    const [address, setAddress] = React.useState("");
    const [postalCode, setPostalCode]= React.useState("");
    const [city, setCity] = React.useState("");

    const getPODAddress = async () => setAddress(await retrievePODAddress(props.webID));
    const getPODPostalCode = async () => setPostalCode(await retrievePODPostalCode(props.webID))
    const getPODCity = async () => setCity(await retrievePODCity(props.webID))

    useEffect(() => {
        getPODAddress();
        getPODPostalCode();
        getPODCity();
    })

    return (
        <Grid container>
            <Grid>
                <Box component="h3">Address: {address}</Box>
                <Box component="h3">Postal Code: {postalCode}</Box>
                <Box component="h3">Locality: {city}</Box>
            </Grid>
        </Grid>
    );
}

export default ShowPodInformation;