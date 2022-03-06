import React,{useState} from "react";


import {Container,Wrapper,LogoContainer,Menu,MenuItem,MenuItemLink,MobileIcon} from "./Navbar.elements";
import { SiAiohttp } from "react-icons/si";
import { FaBars} from 'react-icons/fa'
import {IconContext} from "react-icons";
import GoogleLogin from 'react-google-login';
import {SignUp} from "../login/signup";
import ReactDOM from "react-dom";
import App from "../../App";

const Navbar = () => {

    const[showMobileMenu, setShowMobileMenu] = useState(false);

    return(

        <Container>
            <Wrapper>
                <IconContext.Provider value={{style:{fontSize:"2em"}}}>


                    <LogoContainer>
                        <SiAiohttp></SiAiohttp>
                        <p>De</p><p>De</p>
                    </LogoContainer>
                    <MobileIcon onClick={

                        ()=>setShowMobileMenu(!showMobileMenu)}>

                        <FaBars/>
                    </MobileIcon>

                    <Menu theme={showMobileMenu}>

                        <MenuItem>
                            <MenuItemLink>
                                <GoogleLogin
                                    clientId="1007178029696-bao0ucmangfj9f5of5dkbqk7mmiifqqq.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}/>
                            </MenuItemLink>
                        </MenuItem>


                        <MenuItem>
                            <MenuItemLink>
                                <a onClick={() => {
                                    ReactDOM.render(
                                        <SignUp />,
                                    document.getElementById('root')
                                );}}>
                                SIGN UP
                                </a>
                            </MenuItemLink>
                        </MenuItem>


                        <MenuItem>
                            <MenuItemLink>
                                ORDERS
                            </MenuItemLink>
                        </MenuItem>

                        <MenuItem>
                            <MenuItemLink>
                            ORDERS
                            </MenuItemLink>
                        </MenuItem>


                        <MenuItem>
                            <MenuItemLink>
                            SHOPPING CART
                            </MenuItemLink>
                        </MenuItem>


                    </Menu>
                </IconContext.Provider>
            </Wrapper>
        </Container>

    );

}

const responseGoogle = (response:any) => {
    console.log(response);
}

export default Navbar;