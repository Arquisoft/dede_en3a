import { PinDropSharp } from "@mui/icons-material";
import { padding } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { OrderInd } from "../../api/model/orders/orderInd";
import styles from "./ParallaxItem.module.scss";

type ParallaxItemProps = {
  item: JSX.Element;
  perspective: number;
  distance: number;
};

function ParallaxItem(props: ParallaxItemProps): JSX.Element {
  const scale = (props.perspective - props.distance) / props.perspective;
  return (
    <div
      className={styles.container}
      style={{ perspective: props.perspective + "px" }}
    >
      <div
        className={styles.parallaxChild}
        style={{
          transform:
            "translateZ(" + props.distance + "px) scale(" + scale + ")",
        }}
      >
        {props.item}
      </div>
    </div>
  );
}

export default ParallaxItem;
