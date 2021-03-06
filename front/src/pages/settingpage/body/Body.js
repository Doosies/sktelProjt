import React from 'react';
import styled from 'styled-components';
import { PhoneChangeProvider } from '../../../context/PhoneChangeContext';
import { PhoneInfoProvider } from '../../../context/PhoneInfoContext';
import Contents from './contents/Contents';
import LeftMenu from './leftmenu/LeftMenu';

const StyledBody = styled.div`
    /* display:flex; */
    width:100%;
    display: grid;
    grid-template-columns: 200px 1px 1fr;
    /* grid-template-rows: 1fr 1fr 1fr; */
    grid-column-start: 1/4;
    border-top: solid 1px;
`;

const Line = styled.div`
    background-color: black;
    width:1px;
`;

function Body(){
    return(
        <StyledBody>
            <LeftMenu/>
            <Line/>
            <PhoneInfoProvider>
                <PhoneChangeProvider>
                    <Contents/>
                </PhoneChangeProvider>
            </PhoneInfoProvider>
        </StyledBody>
    );
}
// export default React.memo(Body);
export default Body;