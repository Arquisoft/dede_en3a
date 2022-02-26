import React, { ReactElement } from "react";
import { Button } from "@mui/material";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { LoginButton } from "@inrupt/solid-ui-react";

export default {
      title: "Authentication/Login Button",
      component: LoginButton,
      argTypes: {
        onError: {
              description: `Function to be called on error.`,
                  action: "onError",
                },
        oidcIssuer: {
              description: `The user's identity provider.`,
                },
        authOptions: {
              description: `Additional options to be passed to [login](https://docs.inrupt.com/developer-tools/api/javascript/solid-client-authn-browser/classes/_session_.session.html#login).`,
                },
        redirectUrl: {
              description: `The URL to which the user will be redirected after logging in with their identity provider.`,
                },
      },
};

export function WithChildren({
                                     oidcIssuer,
                                     onError,
                                   }: {
      oidcIssuer: string;
      onError: (error: Error) => void;
    }): ReactElement {
      return (
            <SessionProvider sessionId="log-in-example">
              <p>
                <em>{"Note: "}</em>
            to test out the Authentication examples, you will need to click the
            pop-out icon on the top right to open this example in a new tab first.
          </p>

          <LoginButton
            oidcIssuer={oidcIssuer}
            redirectUrl={window.location.href}
            onError={onError}
          >
            <Button color="primary">Log In</Button>
          </LoginButton>
        </SessionProvider>
      );
    }

WithChildren.args = {
      oidcIssuer: "https://inrupt.net",
    };