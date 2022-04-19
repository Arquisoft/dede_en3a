import {Address} from "../../../api/model/pod/address";
import {getSolidDataset, getStringNoLocale, getThing, getUrl, getUrlAll, Thing} from "@inrupt/solid-client";
import {VCARD} from "@inrupt/vocab-common-rdf";

export async function AddressCalculator(webID : string): Promise<Address[]>{
    let profileDocumentURI = webID.split("#")[0]
    let myDataSet = await getSolidDataset(profileDocumentURI)
    let profile = getThing(myDataSet, webID)
    let urlAddress = getUrlAll(profile as Thing, VCARD.hasAddress)
    console.log(urlAddress)

    const result : Address[] = [];

    for (const add of urlAddress) {
        const address = await calculator(add, myDataSet);
        result.push(address);
    }

    return result;
}

async function calculator(address: string, myDataSet : any) : Promise<Address>{
    let addressProfile = await getThing(myDataSet, address)
    const add : Address = {
        address: getStringNoLocale(addressProfile as Thing, VCARD.street_address) as string,
        postalcode: getStringNoLocale(addressProfile as Thing, VCARD.postal_code) as string,
        city: getStringNoLocale(addressProfile as Thing, VCARD.locality) as string,
        country: getStringNoLocale(addressProfile as Thing, VCARD.country_name) as string,
        region: getStringNoLocale(addressProfile as Thing, VCARD.region) as string
    }
    return add;
}