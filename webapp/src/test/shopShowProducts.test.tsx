import {render} from "@testing-library/react";
import {Product} from "../api/model/product";
import CardItem from "../components/CardItem/CardItem";
import {Provider, useDispatch} from "react-redux";
import * as React from "react";
import {store} from "../redux/store";
import {BrowserRouter} from "react-router-dom";
import ShopPage from "../components/pages/shopPage/ShopPage";
import {db} from "../utils/firebase"
test ( 'the cardItem is rendered in the ShopPage', async () => {

    const {getByTitle} = render( <BrowserRouter>
                                    <Provider store={store}>
                                        <ShopPage></ShopPage>
                                    </Provider>
                                </BrowserRouter>);
    expect(getByTitle("products")).toBeInTheDocument();

} );