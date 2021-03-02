import React from 'react';
import styled from 'styled-components';
import CButton from '../../../components/Button';
import Tables from './Tables';

const StyledContents = styled.div`
    width:100%;
    box-sizing:border-box;

    padding-top:30px;
    padding-left: 30px;
    padding-right:30px;

    display:flex;
    justify-content:center;
    align-items:center;
`;

const ContentsBox= styled.div`
    width:100%;
    height:100%;
`;

const ContentsTop = styled.div`
    position:relative;
    height:50px;
    display:flex;
    width:100%;

    border-bottom: solid 1px;
`;
const ContentsTopName = styled.div`
    font-size:25px;
    font-weight:bold;
`;
const ContentsTopButtons = styled.div`
    padding-top:13px;
    padding-right:13px;
    padding-bottom: 13px;
    height:50%;
    display:flex;

    position:absolute;
    right:0;

    font-size:15px;
    font-weight:500;
`;

const ContentsBottom = styled.div`
    padding-top:7px;
`;
function Contents(){
    return(
        <StyledContents className="contents">
            <ContentsBox>
                <ContentsTop>
                    <ContentsTopName>핸드폰 정보 수정</ContentsTopName>
                    <ContentsTopButtons>
                        <CButton onClick={()=>{alert("데이터 추가")}} width="110px"font_size="16px" font_weight="bold" border>데이터 추가</CButton>
                        <CButton onClick={()=>{alert("수정 완료")}} width="110px"font_size="16px" font_weight="bold" border>수정 완료</CButton>
                    </ContentsTopButtons>
                </ContentsTop>
                <ContentsBottom>
                    <Tables/>
                </ContentsBottom>
            </ContentsBox>
        </StyledContents>
    );
}

export default Contents