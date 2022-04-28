import React, { useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CButton from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { useModal } from '../../../../hooks/useModal';
import { phoneDataUpdate, phoneDataChangedList } from '../../../../modules/phoneData';
import * as RESTAPI from '../../../../utils/api';
import { columnPhoneInfo, requiredInputValue, commaValues } from '../../../../utils/propertyInfo';
import * as utils from '../../../../utils/utils';
import Tables from './Tables';


function Contents(){
    // console.log("contents render");
    const [modalState, showModal, hideModl] = useModal();
    const [inputMode] = useState(true);

    const {dataChangeList, rows} = useSelector( state =>({
        dataChangeList: state.phoneData.dataChangeList,
        rows: state.phoneData.data.rows,
    }), shallowEqual);
    const dispatch = useDispatch();

    //focus 이동을 위한 refs
    const refs = useRef({});
    // NOTE - 순서변경 버튼 클릭시
    // const handleChangeOrder = () =>{
    //     setInputMode(!inputMode);
    //     // console.log(inputMode);
    // }
    //NOTE - 추가버튼 클릭시
    const handleAdd = async ()=>{
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
                // const isNullValue = !columnValue || columnValue === " ";
                // 필수값인지 확인함. 맞을시 그 값을 포커싱해줌
                return requiredInputValue.some(requiredValue =>{
                    if( 
                        columnKey === requiredValue
                         &&( !columnValue || isPassRegTest === false )
                    ){
                        refs.current[row.id][colIdx].focus();
                        refs.current[row.id][colIdx].style.outlineColor="red";
                        return true;
                    } else return false;
                });// 필수값인지 확인
            });// 정규식 통과 못하거나 빈칸있는지 확인
        });// handleApply()
        
        // 추가, 제거, 수정 중 하나의 리스트라도 차있어야 전송함.
        console.log(canSendAddData, deleteList, updateList);
        if(
            canSendAddData || utils.isFilledList(deleteList) || utils.isFilledList(updateList)
        ){
            console.log(canSendAddData,  utils.isFilledList(deleteList),utils.isFilledList(updateList))
            try{
                const response = await RESTAPI.patchPhoneInfo({
                    addList : dataChangeList.dataAddList,
                    deleteList : dataChangeList.dataDeleteList,
                    updateList : dataChangeList.dataUpdateList
                });
                console.log(response);
                // dispatch(phoneDataFetchAsync());
                showModal("수정완료", "성공적으로 수정했습니다");
            } catch(e){
                console.log(e)
                showModal("수정실패", "실패!");
            }
            dispatch(phoneDataChangedList.Init());
        }
    };
    // 37 왼쪽 ,38 위쪽
    // 현재 커서의 위치가 문자의 맨 앞 혹은 맨 뒤일경우
    const handleClickModalYes = () =>{
        hideModl();
    };

    return(
        // <div>
        <StyledContents onMouseDown={console.log} >
            {//modalState.isVisible && 
                <Modal isVisible={modalState.isVisible} title={modalState.modalTitle} onClickYes={handleClickModalYes} noCancel>
                    {modalState.modalText}
                </Modal>
            }
            <ContentsPadding>
                <ContentsTop>
                    <ContentsTopName>핸드폰 정보 수정</ContentsTopName>
                    <ContentsTopButtons>
                        <CButton onClick={ handleAdd } background_color="#f5f5f5" normal>추가</CButton>
                        <CButton onClick={ handleApply } background_color="#7abaff" normal>적용</CButton>
                    </ContentsTopButtons>
                </ContentsTop>
                <ContentsBottom >
                    <Tables ref={refs} inputMode={inputMode}/>
                </ContentsBottom>
            </ContentsPadding>
        </StyledContents>
        // </div>
    );
}

export default React.memo(Contents)



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
    /* justify-content: flex-end; */
    justify-content: space-between;
    /* align-items: flex-end; */
    /* padding-bottom:10px; */
    
    /* width:100%; */
    height:50px;

    border-bottom: solid 2px #707070;
`;
const ContentsTopName = styled.div`
    /* height:100%;
    position:absolute;
    bottom: 1; */
    /* justify-self: flex-start; */
    /* align-self:flex-start; */
    min-width:200px;
    font-size:19px;
    font-weight:bold;
`;
const ContentsTopButtons = styled.div`
    /* height:100%;
    position:absolute;
    right:0;
    bottom:1; */

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