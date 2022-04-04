import {addDoc, collection, getDocs, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import * as geo  from "nominatim-client"
import {db} from "../../utils/firebase";
const orderCollection = collection(db, "orders")





// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//



function degreesToRadians(degrees:number) {
    return degrees * Math.PI / 180;
}

//Latitud oviedo: 43.3603
//Longitud ovied: -5.84476
function distanceInKmBetweenEarthCoordinates(lat1 : number, lon1 : number, lat2 : number, lon2 : number) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
}

async function calculateCoordinates(address : string, postcode : string , mycity : string, country : string, region : string)
{


    let query : string =  mycity + ',' + region + ',' + country + ',' + postcode;
    console.log(query)



}


export const calculateDeliveryOnCall =  async (
            data:{ address: string,
                postalcode: string,
                city : string,
                country: string,
                region: string
            }) => {



            let result = await calculateCoordinates(data.address, data.postalcode, data.city, data.country, data.region);


            let latitudMadrid : number = 40.4167;
            let longitudMadrid : number = -3.70325;

            let distance = distanceInKmBetweenEarthCoordinates(43.3603,-5.84476, latitudMadrid,longitudMadrid);


            //0.5 $ per kilometer
            let costShi =  distance*0.5;
            costShi = parseFloat(costShi.toFixed(2));
            return {
                message: "Congrats, your shipping has been calculated...",
                cost:costShi
            };



        };




export const sendOrder = (async (data : {
        items:
            {product: {
                    id: string,
                    category?: string,
                    description?: string,
                    img: string,
                    price: number,
                    title: string,
                    name?: string},
                amount: number}[],
        user:String,
        addressData:{
            address: string,
            postalcode: string,
            city : string,
            country: string,
            region: string
        } }) => {


    console.log("COMPUTING SHIPPING")
        //COMPUTING SHIPPING
        let addressData = data.addressData;
        let addressAsString = addressData.address + "," + addressData.city + ","
            + addressData.region + "," + addressData.country;
        let result = await calculateCoordinates(addressData.address, addressData.postalcode,
            addressData.city, addressData.country, addressData.region);


    let latitudMadrid : number = 40.4167;
    let longitudMadrid : number = -3.70325;

    let distance = distanceInKmBetweenEarthCoordinates(43.3603,-5.84476, latitudMadrid,longitudMadrid);
        let costShi =  distance*0.5;
        costShi = parseFloat(costShi.toFixed(2));






        ///////////////////



        let items : {itemId:String,amount:number,price:number,img:String,title:string}[] = [];

        var total: number = 0;

        data.items.forEach((item)=>{
            if(item.amount > 0 && item.product.id != null){

                items.push({


                    itemId: item.product.id,
                    amount:item.amount,
                    price:item.product.price,
                    img:item.product.img,
                    title:item.product.title


                });


                total = total + (item.amount * item.product.price);

            }
        });

        if(total <= 0){
            return {
                message: "Not empty orders allowed...",
                status:500
            };
        }


    console.log("ADDING")
        await addDoc(orderCollection, {
            created: Date.now(),
            userEmail:data.user,
            items:items,
            address:addressAsString,
            shippingCost:costShi,
            totalAmount:total+costShi

        })
            .then(()=>{

                return {
                    message: "Congrats, your order has been saved...",
                    status:200
                };

            })
            .catch((err : Error)=>{


                return {
                    message: "Problem saving order...",
                    status:500
                };


            })

        return {
            message: "Congrats, your order has been saved...",
            status:200
        };

    });
