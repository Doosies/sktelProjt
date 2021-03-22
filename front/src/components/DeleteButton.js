import React from 'react'
import styled, { css } from 'styled-components';
import Button from './Button';

const StyledDeleteButton = styled(Button)`
    background-color: #ff7787;
    margin-right:5px;
    color:white;
    width:40px;

    ${({top}) => top && css`
        background-color:white;
        color:white;
        width:40px;
    `}
`;

const DeleteButton = ({onClick, top, children}) =>{
    return(
        <StyledDeleteButton onClick={onClick} top={top}>
            {children}
        </StyledDeleteButton>
    );
}

export default React.memo(DeleteButton);