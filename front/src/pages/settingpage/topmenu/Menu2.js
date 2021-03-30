import React from 'react';
import styled from 'styled-components';
import CButton from '../../../components/Button';

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
            <CButton onClick={onClickModifyData} width="110px" font_size="14px" font_weight="bold" >데이터 수정</CButton>
        </StyledMenu2>
    );
}
export default Menu2