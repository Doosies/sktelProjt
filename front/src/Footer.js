import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:200px;
    background-color:rgb(0,0,0,0.1);
`;

function Footer(){
    return(
        <StyledFooter>
            Here is Footer Area
        </StyledFooter>
    );
}
export default Footer