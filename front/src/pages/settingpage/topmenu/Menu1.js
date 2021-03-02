import React from 'react';
import styled from 'styled-components';

const StyledMenu1 = styled.div`
    height:60px;
    background-color: rgba(0, 0, 0, 0.6);
`;

const Logo = styled.div`
    width:170px;
    height:inherit;
    background-color:black;
`;

const TopSubMenu = styled.div`
    width:350px;
    height:inherit;
`;

function Menu1(){
    return(
        <StyledMenu1>
            <Logo>logo</Logo>
            <TopSubMenu>
                
            </TopSubMenu>
        </StyledMenu1>
    );
}
export default Menu1