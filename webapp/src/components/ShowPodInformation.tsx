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

async function retrievePODAdress(webID: string): Promise<string> {
    let profileDocumentURI = webID.split("#")[0];
    let myDataset = await getSolidDataset(profileDocumentURI);
    let profile = getThing(myDataset, webID);
    let name = getStringNoLocale(profile as Thing, VCARD.street_address) as string;


    return name
}

function ShowPodInformation(props: PODProps): JSX.Element {

    const [name, setName] = React.useState("");

    const getPODName = async () => setName(await retrievePODAdress(props.webID));

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