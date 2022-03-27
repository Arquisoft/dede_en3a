import {fireEvent, render} from "@testing-library/react";
import * as React from "react";
import TopMenu from "../src/components/menu/TopMenu";

test ( 'Navbar home test', async () => {

    const {getByText} = render( <TopMenu></TopMenu> );
    const homeButton = getByText("Home");
    fireEvent.click(homeButton);
    expect(getByText("Dede")).toBeInTheDocument();

} );

test ( 'Navbar shop test', async () => {

    const {getByText} = render( <TopMenu></TopMenu> );
    const shopButton = getByText("Shop");
    fireEvent.click(shopButton);
    expect(getByText("Shop")).toBeInTheDocument();

} );

test ( 'Navbar about us test', async () => {

    const {getByText} = render( <TopMenu></TopMenu> );
    const homeButton = getByText("About us");
    fireEvent.click(homeButton);
    expect(getByText("DeDe_en3a")).toBeInTheDocument();

} );

test ( 'Navbar Contact test', async () => {

    const {getByText} = render( <TopMenu></TopMenu> );
    const homeButton = getByText("Contact");
    fireEvent.click(homeButton);
    expect(getByText("Contact")).toBeInTheDocument();

} );