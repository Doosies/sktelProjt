import React, { } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import CButton from '../../../../components/Button';
import { phoneDataAdd } from '../../../../modules/phoneData';
import Tables from './Tables';

const StyledContents = styled.div`
    width:100%;
    box-sizing:border-box;

    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;

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

    border-bottom: solid 1px #707070;; 
`;
const ContentsTopName = styled.div`
    font-size:19px;
    font-weight:bold;
`;
const ContentsTopButtons = styled.div`
    /* padding-top:13px; */
    padding-right:13px;
    /* padding-left:13px; */
    padding-bottom: 13px;
    height:35px;
    display:flex;

    font-size:15px;
    font-weight:500; 
`;

const ContentsBottom = styled.div`
    width:100%;
    display:flex;
    padding-top:7px;
`;

function Contents(){
    console.log("contents 컴포넌트 렌더");
    
    const dispatch = useDispatch();
    const addPhone = () => dispatch(phoneDataAdd());

    const handleAdd =  ()=>{
        addPhone();
    };

    const handleApply = () =>{
    }
    
    return(
        <StyledContents className="contents">
            <ContentsBox>
                <ContentsTop>
                    <ContentsTopName>핸드폰 정보 수정</ContentsTopName>
                </ContentsTop>
                <ContentsBottom>
                    <ContentsTopButtons>
                        <CButton onClick={ handleAdd } width="60px"font_size="13px" font_weight="bold" border>추가</CButton>
                        <CButton onClick={ handleApply } width="60px"font_size="13px" font_weight="bold" border>적용</CButton>
                    </ContentsTopButtons>
                    <Tables key="tableskey"/>
                </ContentsBottom>
            </ContentsBox>
        </StyledContents>
    );
}

export default React.memo(Contents);