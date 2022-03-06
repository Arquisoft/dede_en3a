import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100% ;
  background-color: blue;
  display:flex;
  justify-content: space-between;
  font-size: 1.7rem;
`;
export const Wrapper = styled.div`

  width: 100%;
  max-width: 1300em;
  height: 100% ;
  background-color: blue;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`

  margin-left: 0.5rem;
  display: flex;
  align-items:center;
  
  font-family: sans-serif;
    
  p{
    &:nth-child(2){
      color:white;
      background-color: blue;
      border-radius: 0.2em;
    }
    &:nth-child(3){
      color: blue;
      background-color: white;
      border-radius: 0.2em;
    }
  }
  
  svg{
    fill: white;
    margin-right: 0.5rem;
  }
    
`;



export const Menu = styled.ul`

  
  height:100%;
  display:flex;
  justify-content: space-between;
  list-style: none;
  background-color: blue;
  
  @media screen and (max-width: 900px){
    position: absolute;
    top:2em;
    left: ${props => (props.theme.open ? "0" : "-100")}%;
    width:100%;
    heigth:90vh;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: 0.5s all ease;
  }
 

`;
Menu.defaultProps = {
    theme: {
        open: true
    }
}



export const MenuItem = styled.li`

    height: 100%;
    align-content: center;
  @media screen and (max-width: 900px){
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: left;
    align-items: center;
    
  }
    
`;
export const MenuItemLink = styled.a`

  display:flex;
  justify-content: center;
  align-content: center;
  height: 100%;
  padding: 0.5rem ;
  color: white;
  font-family: sans-serif;
  
  font-weight: 300;
  cursor:pointer;
  transition: 0.5s all ease;
  
  &:hover{
    color: blue;
    background-color: white;
    transition: 0.5s all ease;
  }

  @media screen and (max-width: 900px){
    width: 100%;

  }
`;



export const MobileIcon = styled.div`

  display:none;
  
  @media screen and (max-width: 900px){
    display:flex;
    align-items: center;
    cursor: pointer;
    
    svg{
      fill:#feb236;
      margin-right: 0.5rem;
    }
  }
    
`;
