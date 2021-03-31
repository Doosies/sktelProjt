import React, { createRef, useEffect, useMemo, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CButton from '../../../../components/Button';
import { phoneDataUpdate, phoneDataFetchAsync, phoneDataChangedList } from '../../../../modules/phoneData';
import * as RESTAPI from '../../../../utils/api';
import { columnPhoneInfo, requiredInputValue, commaValues, notRequiredInputValue } from '../../../../utils/propertyInfo';
import * as utils from '../../../../utils/utils';
import Tables from './Tables';


const StyledContents = styled.div`

    width:100%;
    height:100%;
    position:relative;

    overflow-y:hidden;
`;

const ContentsPadding= styled.div`
    
    width:100%;
    height:100%;
    position:absolute;
    box-sizing:border-box;

    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 80px;
`;

const ContentsTop = styled.div`
    position:relative;
    display:flex;
    
    /* width:100%; */
    height:50px;

    border-bottom: solid 2px #707070;; 
`;
const ContentsTopName = styled.div`
    height:100%;
    font-size:19px;
    font-weight:bold;
`;
const ContentsTopButtons = styled.div`
    height:100%;
    position:absolute;
    right:0;
    bottom:1;

    display:flex;
    align-items:center;
    justify-content:center;
    
    font-size:15px;
    font-weight:500; 
`;

const ContentsBottom = styled.div`
    width:100%;
    height:100%;
`;




function Contents(){
    // console.log("contents!!"); 
    const dispatch = useDispatch();
    const {dataChangeList, rows} = useSelector( state =>({
        dataChangeList: state.phoneData.dataChangeList,
        rows: state.phoneData.data.rows,
    }), shallowEqual);

    //focus 이동을 위한 refs
    const refs = useRef({});

    //NOTE - 추가버튼 클릭시
    const handleAdd =  ()=>{
        dispatch(phoneDataUpdate.Add());
    };

    //NOTE - 적용버튼 클릭시
    const handleApply = async() =>{
        const addList = dataChangeList.dataAddList;
        const deleteList = dataChangeList.dataDeleteList;
        const updateList = dataChangeList.dataUpdateList;
        // 만약 추가버튼을 눌러서 추가한 데이터가 있으면
        const canSendAddData =  utils.isFilledList(addList) && !addList.some( row => {
            const rowIdx = rows.findIndex(originalRow=>originalRow.id === row.id);
            // 추가된 row를 맨 앞 id를 자르고서 키와 값을 rowEntires에 넣음
            const rowEntries = Object.entries(rows[rowIdx]).splice(1);
            // 빈칸이 있거나 정규식을 통과 못하면 TRUE 아니면 FALSE
            return rowEntries.some((ele,colIdx) => {
                const columnKey = ele[0];
                const columnValue = 
                    commaValues.some(val=>val === columnKey) 
                    ? utils.uncomma(ele[1]) 
                    : ele[1];

                const isPassRegTest = columnPhoneInfo[colIdx].reg.test(columnValue);
                const isNullValue = !columnValue || columnValue === " ";
                // 필수값인지 확인함. 맞을시 그 값을 포커싱해줌
                return requiredInputValue.some(requiredValue =>{
                    if( 
                        columnKey === requiredValue
                         &&( isNullValue || isPassRegTest === false )
                    ){
                        refs.current[row.id][colIdx].focus();
                        return true;
                    } else return false;
                });// 필수값인지 확인
            });// 정규식 통과 못하거나 빈칸있는지 확인
        });// handleApply()
        
        // 추가, 제거, 수정 중 하나의 리스트라도 차있어야 전송함.
        if(
            canSendAddData 
            || utils.isFilledList(deleteList) 
            || utils.isFilledList(updateList)
        ){
            try{
                const response = await RESTAPI.patchPhoneInfo({addList,deleteList,updateList});
                dispatch(phoneDataFetchAsync());
                alert(response);
            } catch(e){
                alert("데이터 전송에 실패했습니다. 로그 확인바람.");
                console.log(e)
            }
            dispatch(phoneDataChangedList.Init());
        }
    };
    // 37 왼쪽 ,38 위쪽
    // 현재 커서의 위치가 문자의 맨 앞 혹은 맨 뒤일경우
    const handleKeyUp = (e) =>{
        const nowUpKey = e.keyCode;
        if( nowUpKey === 37 || nowUpKey === 39 )
            if(e.target.selectionEnd === 0 || e.target.selectionEnd === e.target.value.length){
                console.log(false);
            } else console.log(true);

    }
    // 39 오른쪽, 40 아래쪽
    // 맨뒤 혹은 맨앞으로 가려는 이벤트 중지
    const handleKeyDown = (e)=>{
        const nowDownKey = e.keyCode;
        if( nowDownKey === 38 || nowDownKey === 40)
            e.preventDefault();
    }

    

    return(
        <StyledContents onMouseDown={console.log} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown}>
            <ContentsPadding>
                <ContentsTop>
                    <ContentsTopName>핸드폰 정보 수정</ContentsTopName>
                    <ContentsTopButtons>
                        <CButton onClick={ handleAdd } width="60px" height="40px" font_size="13px" font_weight="bold" border>추가</CButton>
                        <CButton onClick={ handleApply } width="60px" height="40px" font_size="13px" font_weight="bold" border>적용</CButton>
                    </ContentsTopButtons>
                </ContentsTop>
                <ContentsBottom >
                    <Tables  ref={refs}/>
                </ContentsBottom>
            </ContentsPadding>
        </StyledContents>
    );
}

export default React.memo(Contents)