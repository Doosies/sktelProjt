import React from 'react';
import styled from 'styled-components';
import CButton from '../../../components/Button';

const StyledMenu1 = styled.div`
    width:initial;
    height:60px;
    background-color: rgba(0, 0, 0, 0.6);
    display:flex;
`;

const TopMenuLeft = styled.div`
    display:flex;
    height:inherit;
`;
const TopSubRight = styled.div`
    /* width:350px; */
    height:inherit;
    display:flex;
    position:absolute;
    right:0;
`;

function Menu1(){
    const onClickLogo = () =>{
        alert("로고 click");
    };
    const onClickAdminPage = () =>{
        alert("관리자 페이지 click");
    };
    const onClickGoMainPage = () =>{
        alert("메인페이지로 이동 click");

    };
    const onClickLogOut = () =>{
        alert("로그아웃 click");
    };

    return(
        <StyledMenu1>
            <TopMenuLeft>
                <CButton onClick={onClickLogo} width="110px" color="#ffffff" font_size="16px" font_weight="bold" >Logo</CButton>
                <CButton onClick={onClickAdminPage} width="200px" color="#ffffff" font_size="22px" font_weight="bold" >관리자 페이지</CButton>
            </TopMenuLeft>
            <TopSubRight>
                <CButton onClick={onClickGoMainPage} width="200px" color="#ffffff" font_size="16px" font_weight="bold" >메인페이지로 이동</CButton>
                <CButton onClick={onClickLogOut} width="150px" color="#ffffff" font_size="16px"font_weight="bold" >로그아웃</CButton>
            </TopSubRight>
        </StyledMenu1>
    );
}
export default Menu1