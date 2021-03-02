import React from 'react';
import styled from 'styled-components';

const StyledContents = styled.div`
    /* width:100vw; */
    /* background-color: red; */
`;

function Contents(){
    return(
        <StyledContents className="contents">
            컨텐트
        </StyledContents>
    );
}

export default Contents