import React from 'react'
import {Container, LogoContainer, Menu, MenuItem, MenuItemLink, Wrapper} from './Navbar.elements'

const Navbar = () => {
    return(
        <Container>
            <Wrapper>
                <LogoContainer>

                </LogoContainer>
                <Menu>
                    <MenuItem>
                        <MenuItemLink>
                            HOME
                        </MenuItemLink>
                    </MenuItem>
                    <MenuItem>
                        <MenuItemLink>
                            ITEM 1
                        </MenuItemLink>
                    </MenuItem>
                    <MenuItem>
                        <MenuItemLink>
                            ITEM 2
                        </MenuItemLink>
                    </MenuItem>
                    <MenuItem>
                        <MenuItemLink>
                            ITEM 3
                        </MenuItemLink>
                    </MenuItem>
                </Menu>
            </Wrapper>
        </Container>
    )
}

export default Navbar;