import React, {forwardRef, useCallback,  useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Modal from '../../../../components/Modal';
import Portal from '../../../../components/Portal';
import { useModal } from '../../../../hooks/useModal';
import { phoneDataChangedList, phoneDataUpdate} from '../../../../modules/phoneData';
import { columnPhoneInfo, commaValues, notRequiredInputValue, requiredInputValue } from '../../../../utils/propertyInfo';
import * as utils from '../../../../utils/utils';

const Input = forwardRef(({colIndex, id, width},ref) =>{
    
    const [modalState, showModal, hideModal] = useModal();
    // const keys = ref.current.

    const dispatch = useDispatch();
    // 현재 data의 column 정보와 검증값
    const nowColumnInfo = columnPhoneInfo[colIndex];
    
    const { nowVal, firstVal, isAddedRow } = useSelector(state =>({
        // 현재 input값
        nowVal     : state.phoneData.data.rows.find(val=>val.id === id)[nowColumnInfo.colName],
        // 현재 column의 최초 데이터, 추가버튼으로 추가된 row의 경우 null임
        firstVal   : state.phoneData.firstData.lastId < id 
                     ? null
                     : state.phoneData.firstData.rows.find(val=>val.id===id)[nowColumnInfo.colName],
        // 현재 row의 값이 받아온 데이터의 lastId보다 크다면 true
        // 추가된 row인지 판별
        isAddedRow : state.phoneData.firstData.lastId < id
                     ? true
                     : false,

    }),shallowEqual);


    const callbackDispatch = useCallback((dispatchFunc) =>{
        return(...args)=>{
            dispatch(dispatchFunc(...args));
        }
    },[dispatch]);
    //////////////////////
    const updateInputCompo = useCallback( (value) => 
        dispatch(phoneDataUpdate.Change(id,nowColumnInfo.colName, value))
    ,[nowColumnInfo.colName, dispatch, id]);
    
    // state를 바꿔주는 dispatch* change,delete //
    // const updateListInsert = callbackDispatch(phoneDataChangedList.Insert);
    const updateListUpdateChange = callbackDispatch(phoneDataChangedList.Update.Change);
    const updateListUpdateDelete = callbackDispatch(phoneDataChangedList.Update.Delete);
    const updateListAddChange = callbackDispatch(phoneDataChangedList.Add.Change);
    const updateListAddDelete = callbackDispatch(phoneDataChangedList.Add.Delete);

    const handleChange = useCallback( (e) => {
        const val = commaValues.some(val => val === nowColumnInfo.colName)
                    ? utils.inputNumberFormat(e.target.value) // 콤마를 적어줌
                    : e.target.value; // 그냥 그대로 입력
        updateInputCompo(val);
    },[nowColumnInfo.colName, updateInputCompo]);

    const handleOnFocus = useCallback( () =>{
    },[]);
     ///////////////////////////////////////////////////////// 포커싱이 벗어났을 때
    const handleBlur = useCallback( () =>{
        const nowValue = nowVal === null ? '' : nowVal;
        const deletedWord = nowValue.replace(nowColumnInfo.deleteWord,"");

        const isPassRegTest = nowColumnInfo.reg.test(deletedWord);
        const isNullValue = deletedWord=== " " || deletedWord ==="";
        const isRequiredValue = requiredInputValue.some(val=>val === nowColumnInfo.colName);
        //    정규식 통과 못함   && 빈값이 아님.
        if( ( isPassRegTest === false && !isNullValue )
        //       필수값인데 빈칸일경우
        ||( isRequiredValue && deletedWord ==="")
        ){
            showModal("잘못된 값입니다.", nowColumnInfo.error);
        }
        //정규식을 통과할 경우(올바른 값일경우)
        else{
            // NOTE - commaValues에 포함될경우 콤마를 찍어줌
            const modifiedValue = commaValues.some(val => val === nowColumnInfo.colName)
            ? utils.uncomma(deletedWord)
            : deletedWord;
            // const firstValue = firstVal || '';
            const firstValue = firstVal === null ? '': firstVal;
            
            // 추가한 행이 아니라면
            if( !isAddedRow ) 
                modifiedValue === firstValue   
                // 새로 추가한 row가 아닐경우           
                ? updateListUpdateDelete(id, nowColumnInfo.colName)                // 최초값과 수정한 값이 같을경우, delete
                // 새로 추가한 row일 경우
                : updateListUpdateChange(id, nowColumnInfo.colName, modifiedValue);// 최초값과 수정한 값이 다를경우, change
            else if( isAddedRow ){
                modifiedValue === firstValue   
                ?updateListAddDelete(id, nowColumnInfo.colName)
                :updateListAddChange(id, nowColumnInfo.colName, modifiedValue);
            }
            if( requiredInputValue.some(val=> val === nowColumnInfo.colName))
                updateInputCompo(modifiedValue);
        }
        
    },[nowVal, nowColumnInfo.deleteWord, nowColumnInfo.reg, nowColumnInfo.colName, nowColumnInfo.error, showModal, firstVal, isAddedRow, updateListUpdateDelete, id, updateListUpdateChange, updateInputCompo, updateListAddDelete, updateListAddChange]);

    const handleKeyUp = (e) =>{
        // const nowUpKey = e.keyCode;
        // if( nowUpKey === 37 || nowUpKey === 39 )
        //     if(e.target.selectionEnd === 0 || e.target.selectionEnd === e.target.value.length)
        //         setEnd(true);
        //     else   
        //         setEnd(false);

    }
    // 39 오른쪽, 40 아래쪽
    // 맨뒤 혹은 맨앞으로 가려는 이벤트 중지
    const handleKeyDown = (e)=>{
        // console.log(e.target.selectionEnd, e.target.selectionStart);
        // const nowDownKey = e.keyCode;
        // if( nowDownKey === 38 || nowDownKey === 40)
        //     e.preventDefault();
    }
    const handleOnclickYes = () =>{
        hideModal();
        ref.current[id][colIndex].focus();
        updateInputCompo(firstVal);

        // ref.current[refIdx].refs[colIndex].focus();
        // didShowAlert.current=true;
    }
    return( 
        <InputWrap>
            {modalState.isVisible && 
                <Portal elementId="modal-root">
                    <Modal title={modalState.modalTitle} onClickYes={handleOnclickYes} noCancel>
                        {modalState.modalText}
                    </Modal>
                </Portal>
            }
            <StyledInput onKeyUpCapture={handleKeyUp} onKeyDown={handleKeyDown}
                ref={el=>ref.current[id] = {...ref.current[id], [colIndex]:el} }
                textalign={nowColumnInfo.textalign} 
                width={width} 
                value={nowVal === null ? "" : nowVal }
                required={notRequiredInputValue.every(val => val !== nowColumnInfo.colName) ? true : false}
                onChange={handleChange}
                onFocus={handleOnFocus}
                onBlur={handleBlur}
            />
        </InputWrap>
    );
});
export default React.memo(Input);


const InputWrap = styled.div`
`;
const StyledInput = styled.input`
    box-sizing:border-box;
    ${({ width, textalign })=>css`
        width:${width};
        text-align:${textalign};
    `}
`;