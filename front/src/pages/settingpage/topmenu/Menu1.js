import React from 'react';
import styled from 'styled-components';
import CButton from '../../../components/Button';
import ClicakableDiv from '../../../components/ClicakableDiv';

const StyledMenu1 = styled.div`
    width:auto;
    height:60px;
    background-color: rgba(0, 0, 0, 0.6);
    display:flex;
`;

const TopMenuLeft = styled.div`
    display:flex;
    /* height:inherit; */
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
    const onClickModifyData = () =>{
        alert("데이터 수정 클릭");
    };

    return(
        <StyledMenu1>
            <TopMenuLeft>
                {/* <ClicakableDiv onClick={onClickLogo} width="110px" color="#ffffff" font_size="16px" font_weight="bold" >Logo</ClicakableDiv> */}
                <ClicakableDiv onClick={onClickModifyData} width="110px" color="#ffffff" font_size="14px" font_weight="bold" >데이터 수정</ClicakableDiv>
                {/* <ClicakableDiv onClick={onClickAdminPage} width="200px" color="#ffffff" font_size="22px" font_weight="bold" >관리자 페이지</ClicakableDiv> */}
            </TopMenuLeft>
            <TopSubRight>
                {/* <ClicakableDiv onClick={onClickGoMainPage} width="200px" color="#ffffff" font_size="16px" font_weight="bold" >메인페이지로 이동</ClicakableDiv> */}
                <ClicakableDiv onClick={onClickLogOut} width="150px" color="#ffffff" font_size="16px"font_weight="bold" >로그아웃</ClicakableDiv>
            </TopSubRight>
        </StyledMenu1>
    );
}
export default Menu1