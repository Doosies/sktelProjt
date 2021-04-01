import React from 'react';
import styled, { css } from "styled-components";

const StyledDiv = styled.div`
    display:flex;
    box-sizing:border-box;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color:rgb(0,0,0,0);
    border:0;
    
    ${props => css`
        width: ${props.width};
        height: ${props.height};
        color: ${props.color};
        background-color: ${props.background_color};
        font-size: ${props.font_size};
        font-weight:${props.font_weight};
    `}

    :hover{
        color:rgb(122, 187, 255);
    }
`;

function ClickableDiv({ onClick, background_color, normal, width, height, color, font_size, font_weight, border, children, ...rest }){
    return(
        <StyledDiv background_color={background_color} normal={normal} onClick={onClick} width={width} height={height} color={color} font_size={font_size} font_weight={font_weight} border={border} {...rest}>
            {children}
        </StyledDiv>
    );
}
export default React.memo(ClickableDiv);