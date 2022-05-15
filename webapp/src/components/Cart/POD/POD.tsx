import React, { useState } from "react";
import ShowPodInformation from "./ShowPodInformation";
import styles from "./POD.module.scss";

function pod(webID: string) {
  if (webID.includes("solidcommunity.net/profile/card#me")
    || webID.includes("solidweb.org/profile/card#me")
    || webID.includes("inrupt.net/profile/card#me")) {
    console.log(webID)
    return <ShowPodInformation webID={webID} />;
  } else if (webID.length != 0) {
    return <h3>Please enter a valid POD</h3>;
  }
}

function POD(): JSX.Element {
  const [webID, setWebID] = useState("");

  return (
    <div className={styles.podwrapper}>
      <form name={"pod-form"}>
        <h2 title={"podHeader"} className={styles.podheader}>
          Introduce your webID in order to get your POD information
        </h2>
        <input
          className={styles.podinputfield}
          id="input-form"
          type={"text"}
        ></input>
        <br />
        <br />
        <div className={styles.buttonsPOD}>
          <button
            title={"getPOD"}
            type="button"
            onClick={() => {
              setWebID(
                (document.getElementById("input-form") as HTMLInputElement)
                  .value
              );
            }}
          >
            Get POD
          </button>
        </div>
      </form>
      {pod(webID)}
    </div>
  );
}

export default POD;
