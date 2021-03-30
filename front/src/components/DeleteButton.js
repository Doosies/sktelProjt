import React from 'react'
import styled, { css } from 'styled-components';
import Button from './Button';

const StyledDeleteButton = styled(Button)`
    background-color: #ff7787;
    margin-right:5px;
    color:white;
    min-width:40px;

    ${({top}) => top && css`
        background-color:white;
        color:white;
        width:40px;
    `}
`;

const DeleteButton = ({onClick, top, children}) =>{
    return(
        // deletebutton을 누르면이전에 발생한 모든 이벤트를 취소함.
        <StyledDeleteButton onClick={onClick} top={top} onMouseDown={(e)=>{e.preventDefault()}}>
            {children}
        </StyledDeleteButton>
    );
}

export default React.memo(DeleteButton);