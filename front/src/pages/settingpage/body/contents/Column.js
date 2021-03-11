import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

const StyledColumn = styled.div`
    border-bottom: solid 1px;
    padding-top:10px;
    padding-bottom:10px;
    padding-left:5px;
    padding-right:5px;
    font-size:12px;
    height:20px;

    width: 100px;
    ${props=>css` 
        width: ${props.width}; 
        text-align:${props.textalign};
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
    // const colProps = useSelector( state => state.phoneData.columnProperties);
    return(
        <StyledColumn width={width} textalign={textalign} top={top}>
            {children}
        </StyledColumn>
    );
}
export default React.memo(Column);