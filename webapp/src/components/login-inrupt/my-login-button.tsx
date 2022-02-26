import React, { ReactElement } from "react";
import { Button } from "@mui/material";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { LoginButton } from "@inrupt/solid-ui-react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import logo from "../../logo.svg";
import GoogleLogin from 'react-google-login';



export default function MyLoginButton(): JSX.Element {

    return (
        <SessionProvider sessionId="log-in-example">


            <LoginButton
                oidcIssuer={""}
                redirectUrl={'https://inrupt.net'}

            >
                <Button color="primary"  >Log In</Button>
            </LoginButton>
        </SessionProvider>

    );
}


