import React from 'react';
import styled from 'styled-components';
import ClicakableDiv from '../../../components/ClicakableDiv';

const StyledMenu2 = styled.div`
    height:40px;
    display:flex;
    background-color:hsl(0, 0%, 96%);
    /* background-color:rgb(200, 200, 200); */
`;

function Menu2(){
    const onClickModifyData = () =>{
        alert("데이터 수정 클릭");
    };

    return(
        <StyledMenu2>
            <ClicakableDiv onClick={onClickModifyData} width="110px" font_size="14px" font_weight="bold" >데이터 수정</ClicakableDiv>
        </StyledMenu2>
    );
}
export default Menu2