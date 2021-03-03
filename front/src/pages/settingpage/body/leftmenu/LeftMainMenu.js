import React from 'react';
import styled, { css } from 'styled-components';

const StyledLeftMainMenu = styled.div`
    width:100%;
    /* box-sizing:border-box; */

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 30px;
    padding-bottom: 30px;
    
    top:0;
`;

const Box = styled.div`
    width:100%;
    box-sizing:border-box;

    padding-left:18px;
    padding-right:18px;
    padding-top:30px;
    padding-bottom:30px;

    /* border:solid 1px black;Z */
`;

const Depth1 = styled.div`
    width:100%;

    font-size:14px;
    font-weight:bold;

    ${({ top })=>
    /* 맨 위 가 아닐경우 위와 18픽셀 띄워줌 */
        !top &&
        css`
            margin-top:18px;
        `
    };
`;

const Depth2 = styled.div`
    width:100%;
    padding-left:7px;
    padding-top:6px;
    font-size:13px;
    font-weight:500;

    ${({ top })=>
    /* 맨 위 가 아닐경우 위와 18픽셀 띄워줌 */
        top &&
        css`
            padding-top:18px;
        `
    };
`;

const Line = styled.div`
    width:100%;
    padding-top: 18px;
    border-bottom: solid 1px;

`;

function LeftMainMenu(){
    return(
        <StyledLeftMainMenu className="leftmainmenu">
            <Box>
                <Depth1 top>핸드폰정보 수정</Depth1>
                <Line/>
                <Depth1>요금제 수정
                    <Depth2 top>SK 요금제</Depth2>
                    <Depth2>KT 요금제</Depth2>
                    <Depth2>LG 요금제</Depth2>
                </Depth1>
                <Line/>
                <Depth1>정책 수정
                    <Depth2 top>SK 요금제</Depth2>
                    <Depth2>KT 요금제</Depth2>
                    <Depth2>LG 요금제</Depth2>
                </Depth1>
            </Box>
        </StyledLeftMainMenu>
    );
}
export default LeftMainMenu