import React, { useState } from "react";
import ShowPodInformation from "./ShowPodInformation";
import "./POD.scss";

function pod(webID: string) {

    //Puse 43 porque no puede haber un pod link menor que https://.solidcommunity.net/profile/card#me
    if(webID.length > 0 && webID.length < 43){
        return (
            <h3>Please enter a valid SOLIDCommunity POD</h3>
        );
    }
    else if(webID.length != 0) {
        return (
            <ShowPodInformation webID={webID}  />
        );
    }

}

function POD(): JSX.Element {
    const [webID, setWebID] = useState("");

    return (
        <div className={"pod-wrapper"}>
            <form name={"pod-form"}>
                <h2 title={"podHeader"} className={"pod-header"}>Introduce your webID in order to get your POD information</h2>
                <input className="pod-input-field" id= "input-form" type={"text"}></input><br/><br/>
                <div className="buttonsPOD">
                    <button title={"getPOD"} type = "button" onClick={() => {
                        setWebID((document.getElementById("input-form") as HTMLInputElement).value)
                    }
                    }>Get POD</button>
                </div>
            </form>
            {
                pod(webID)
            }
        </div>
    );

}

export default POD;
