import React from 'react';
import styled from 'styled-components';
import LeftMainMenu from './LeftMainMenu';

const StyledLeftMenu = styled.div`
    /* width:200px; */
    min-height:85vh;
    
    display:flex;
    justify-content:center;

    border-right: solid 1px;
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