import React from 'react';
import styled from 'styled-components';
import Menu1 from './Menu1';
import Menu2 from './Menu2';

const StyledTopMenu = styled.div`
    width:100%;
    /* position:relative; */
    /* height:100px; */
`;


function TopMenu(){
    return(
        <StyledTopMenu className="topMenu">
            <Menu1/>
            {/* <Menu2/> */}
        </StyledTopMenu>
    );
}
export default TopMenu