import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';



export default function GoogleLog(){

    return(
        <GoogleLogin
            clientId="1007178029696-bao0ucmangfj9f5of5dkbqk7mmiifqqq.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />

    );

}

const responseGoogle = (response:any) => {
    console.log(response);
}
