import {OrderInd} from "../../api/model/orders/orderInd";
import"./OrderCardItem.scss"

type OrderCardItem = {
    orderItem: OrderInd;
};

function OrderCardItem(ord : OrderCardItem): JSX.Element{

    return(
        <>
            <div className="product-cart-container">
                <img className="product-image" src={ord.orderItem.img}></img>
                <div className="product-cart-description-container">
                    <div className="row1">
                        <div className="price">{ord.orderItem.price + " €"}</div>
                        <div className="product-name">{ord.orderItem.title}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderCardItem;