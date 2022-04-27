import { useNavigate } from "react-router-dom";
import styles from "./ModalPopup.module.scss";
import React, { useState } from "react";

type ModalPopupProps = { onExit: any; onAccept: any; item: JSX.Element };

function ModalPopup(props: ModalPopupProps): JSX.Element {
  const onContainerClick = (event: any) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      props.onExit();
    }
  };

  const preventDefaultClick = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={styles.container} onClick={onContainerClick}>
        <div className={styles.wrapper} onClick={preventDefaultClick}>
          {props.item}
        </div>
      </div>
    </>
  );
}

export default ModalPopup;
