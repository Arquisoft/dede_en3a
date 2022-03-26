
import React, { useState} from "react";
import ShowPodInformation from "./ShowPodInformation";
import "./POD.scss"

function pod(webID: string) {
    if(webID.length == 0) {
        return(<div>

                <h3>Please enter a valid SOLIDCommunity POD</h3>
            <h3>Address:</h3>
            <h3>Postal Code:</h3>
            <h3>Locality:</h3>

        </div>
        );
    }
    return (
        <ShowPodInformation webID={webID}  />
    );
}

function POD(): JSX.Element {
    const [webID, setWebID] = useState("");

    return (
        <div>
            <form name={"pod-form"}>
                <h2>Introuduce your webID in order to get information</h2>
                <input className="pod-input-field" id= "input-form" type={"text"}></input><br/><br/>
                <button type = "button" className = "pod-button"onClick={() => {
                    setWebID((document.getElementById("input-form") as HTMLInputElement).value)
                }
                }>Get Info</button>
            </form>
            {
                pod(webID)
            }
        </div>
    );
}

export default POD;