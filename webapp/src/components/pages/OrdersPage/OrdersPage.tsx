import TopMenu from "../../menu/TopMenu";
import "./OrdersPage.scss";

function OrdersPage(): JSX.Element{

    return(
        <>
            <TopMenu></TopMenu>
            <div className="header-container">
                <div className="header">
                    <div className="title">Orders</div>
                </div>
            </div>
        </>
    );
}

export default OrdersPage;