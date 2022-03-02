import {

    getSolidDataset, getStringNoLocale, getThing, Thing

} from "@inrupt/solid-client";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {FOAF} from "@inrupt/vocab-common-rdf";

type ShowNameFromPodProps = {
    webID: string,
    children: any
}


let name: string | null = ""

async function getName(props: ShowNameFromPodProps) {
    const myDataSet = getSolidDataset(
        props.webID,
        {fetch: fetch}
    );

    const profile = getThing(
        await myDataSet,
        props.webID + "profile/card#me"
    )

    name = getStringNoLocale(profile as Thing, FOAF.name)
    
}

function ShowNameFromPod(props: ShowNameFromPodProps): JSX.Element {
    var name = getName(props)
    return (
        <Grid container>
            <Grid item xs={10}>
                <Box component="h2">Your name is: {name} </Box>
            </Grid>
        </Grid>
    );
}

export default ShowNameFromPod;



