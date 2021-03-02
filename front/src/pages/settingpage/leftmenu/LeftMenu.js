import React from 'react';
import styled from 'styled-components';
import LeftMainMenu from './LeftMainMenu';

const StyledLeftMenu = styled.div`
    width:240px;
    
    display:flex;
    justify-content:center;
    align-items:center;
`;

function LeftMenu(){
    return(
        <StyledLeftMenu className="leftmenu">
            <LeftMainMenu/>
        </StyledLeftMenu>
    );
}
export default LeftMenu