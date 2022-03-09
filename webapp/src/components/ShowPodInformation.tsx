import {
    getSolidDataset, getStringNoLocale, getThing, Thing
} from "@inrupt/solid-client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import {VCARD} from "@inrupt/vocab-common-rdf";
import React, {useEffect} from "react";

type PODProps = {
    webID: string;
};

async function retrievePODInfo(webID: string): Promise<string> {
    let profileDocumentURI = webID.split("#")[0]; // we are just interested in the cardç
    let myDataset = await getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
    let profile = getThing(myDataset, webID); // we obtain the thing we are looking for from the dataset
    let name = getStringNoLocale(profile as Thing, VCARD.street_address) as string;
    // we obtain the property we are looking for and return it


    return name

}

function ShowPodInformation(props: PODProps): JSX.Element {

    const [name, setName] = React.useState("");

    const getPODName = async () => setName(await retrievePODInfo(props.webID));

    useEffect(() => {
        getPODName();
    })

    return (
        <Grid container>
            <Grid>
                <Box component="h3">Name: {name}</Box>
            </Grid>
        </Grid>
    );
}

export default ShowPodInformation;