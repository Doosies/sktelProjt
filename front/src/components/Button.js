import React from 'react';
import styled, { css } from "styled-components";

import {darken, lighten} from 'polished';

const StyledButton = styled.button`
    display:flex;
    box-sizing:border-box;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color:rgb(0,0,0,0);
    border:0;
    border-radius:5px;
    
    ${props => css`
        width: ${props.width};
        height: ${props.height};
        color: ${props.color};
        background-color: ${props.background_color};
        font-size: ${props.font_size};
        font-weight:${props.font_weight};

        :hover{
            ${'' /* border: 1px solid black; */}
            background-color: ${lighten(0.05, props.background_color)};
        }
        :active{

            background-color: ${darken(0.4, props.background_color)};
            outline:none;
        }
    `}

    ${props=> props.border &&
        css`border: solid 1px;`
    }

    ${(props) => 
        props.normal && css`
        width: 60px;
        height: 33px;
        font-size:13px;
        font-weight:bold;
    `}
    ${(props) => 
        props.small && css`
        width: 50px;
        height: 30px;
        font-size:13px;
        ${'' /* font-weight:bold; */}
    `}
    ${props=>
        props.deleteButton && css`
            margin-right:5px;
            min-width:40px;   
    `}
    ${({top}) => top && css`
        visibility:hidden;
    `}

    &:not(:first-child){
        margin-left:10px;
    }

`;

function Button({ onClick, deleteButton, background_color="white", normal, width, height, color, font_size, font_weight, border, top, children, ...rest }){
    return(
        <StyledButton deleteButton={deleteButton} top={top} background_color={background_color} normal={normal} onClick={onClick} width={width} height={height} color={color} font_size={font_size} font_weight={font_weight} border={border} {...rest}>
            {children}
        </StyledButton>
    );
}
export default React.memo(Button);