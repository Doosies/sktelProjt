import React from 'react';
import styled from 'styled-components';
import LeftMainMenu from './LeftMainMenu';

const StyledLeftMenu = styled.div`
    min-width:200px;
    height:100%;
    /* min-height:85vh; */
    
    display:flex;
    justify-content:center;

    border-right: solid 1px;
    background-color:hsl(0, 0%, 99%);
    /* align-items:center; */

`;

function LeftMenu(){
    return(
        <StyledLeftMenu className="leftmenu">
            <LeftMainMenu/>
        </StyledLeftMenu>
    );
}
export default LeftMenu