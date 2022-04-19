import { PinDropSharp } from "@mui/icons-material";
import { padding } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { OrderInd } from "../../api/model/orders/orderInd";
import styles from "./ParallaxItem.module.scss";

type ParallaxItemProps = {
  item: JSX.Element;
  parallaxFactor: number;
};

function ParallaxItem(props: ParallaxItemProps): JSX.Element {
  const [offSet, setOffset] = useState("");
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
  }, []); //Will only be called once upon initialization
  const handleScroll = (e: any) => {
    setOffset("translateY(" + window.scrollY * props.parallaxFactor + "px)");
  };
  return (
    <div
      className={styles.container}
      style={{ transform: offSet, WebkitTransform: offSet }}
    >
      {props.item}
    </div>
  );
}

export default ParallaxItem;
