import React from 'react';
import styled, { css } from 'styled-components';

const StyledColumn = styled.div`
    padding-top:10px;
    padding-bottom:10px;
    padding-left:5px;
    padding-right:5px;
    font-size:12px;
    height:20px;
    text-align:center;

    ${props=>css` 
        min-width: ${props.width}; 
    `}

    /* 제일 상단에 있는 column일 경우 */
    ${({ top }) => top && 
        css `
            padding-top:15px;
            padding-bottom:15px;
            font-size:15px;
            font-weight:bold;
    `}
`;

// top일경우 center, false 기본설정
function Column({width, textalign="center",top,children}){
    // console.log("col");
    return(
        <StyledColumn width={width} textalign={top?"center":textalign} top={top}>
            {children}
    </StyledColumn>
    );
}
export default React.memo(Column,(prev,next)=>{
    return prev.children === next.children;
});