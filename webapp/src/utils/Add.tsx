
import {getFunctions} from "firebase/functions";
import {httpsCallable} from "firebase/functions";
export function Add(){

    var res ;

    const  add = async () => {


        const sendOrder = httpsCallable(getFunctions(), 'sendOrder');

        res = await sendOrder({
            items:[
                {product: {
                        id: "1",
                        img: "non",
                        price: 0.6,
                        title: "FFP2 mask",
                        category: "SI",
                        description: "Hola",
                        name: "string"
                    },
                    amount: 3}
            ],
            user:"pablo@garciafernandez.eu",
            address:"Cassa de Pablo"
        })
            .then(( ) => {
                console.log("Your order has been processed.");
            }).catch(()=>{

                console.log("Sorry, we are suffering technical problems, try again...");

        });



    }


    return(
        <div>
        <button onClick={add}>AAAAAAAAAAA</button>
            <h3>{res}</h3>
        </div>
    );

}