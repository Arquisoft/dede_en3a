import {fireEvent, render} from "@testing-library/react";
import * as React from "react";
import TopMenu from "../src/components/menu/TopMenu";



test ( 'Navbar home test', async () => {

    const {getByText} = render( <TopMenu></TopMenu> );
    const homeButton = getByText("Home");
    fireEvent.click(homeButton);
    expect(getByText("Dede")).toBeInTheDocument();

} );