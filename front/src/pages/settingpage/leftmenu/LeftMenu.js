import React from 'react';
import styled from 'styled-components';

const StyledLeftMenu = styled.div`
    /* width:100vw; */
    /* background-color: yellow; */
`;

function LeftMenu(){
    return(
        <StyledLeftMenu className="leftmenu">
            레프트메뉴
        </StyledLeftMenu>
    );
}
export default LeftMenu