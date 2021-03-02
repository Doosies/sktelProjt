import React, {} from 'react';
import styled from 'styled-components';
import Contents from './contents/Contents';
import LeftMenu from './leftmenu/LeftMenu';

import TopMenu from './topmenu/TopMenu';

const StyledSettingPage = styled.div`
    display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-columns: 240px 1px 1fr;

    .topMenu{
        grid-column: 1/4;
        grid-row:1/2
    }
`;

const Line = styled.div`
    background-color: black;
`;

function SettingPage(){
    return(
        <StyledSettingPage>
            <TopMenu/>
            <LeftMenu/>
            <Line/>
            <Contents/>
        </StyledSettingPage>
    );
}
export default SettingPage