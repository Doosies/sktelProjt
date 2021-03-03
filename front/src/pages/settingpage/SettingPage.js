import React, {} from 'react';
import styled from 'styled-components';
import Body from './body/Body';
import Contents from './body/contents/Contents';
import LeftMenu from './body/leftmenu/LeftMenu';

import TopMenu from './topmenu/TopMenu';

const StyledSettingPage = styled.div`
    /* display: grid; */
	/* grid-template-columns: 1fr 1fr 1fr;
	grid-template-columns: 240px 1px 1fr;

    .topMenu{
        grid-column: 1/4;
        grid-row:1/2
    } */
    border-bottom: solid 1px;
    width:100%;
    height:100%;
`;


function SettingPage(){
    return(
        <StyledSettingPage>
            <TopMenu/>
            <Body/>
        </StyledSettingPage>
    );
}
export default SettingPage