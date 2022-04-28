import { animated } from '@react-spring/web';
import React, {forwardRef, useCallback, useEffect} from 'react';
import { useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Modal from '../../../../components/Modal';
import { useModal } from '../../../../hooks/useModal';
import { phoneDataChangedList, phoneDataUpdate} from '../../../../modules/phoneData';
import { columnPhoneInfo, commaValues, notRequiredInputValue, requiredInputValue } from '../../../../utils/propertyInfo';
import * as utils from '../../../../utils/utils';

const Input = forwardRef(({colIndex, rowIdx, id, width},ref) =>{
    const dispatch = useDispatch();
    // console.log("input");
    
    const isInvalid = useRef(false);
    const [modalState, showModal, hideModal] = useModal();
    const {colName,deleteWord,error,reg,textalign } = columnPhoneInfo[colIndex];

    // const idx = useSelector( state => state.phoneData.data.rows.);
    const { nowVal, firstVal, isAddedRow } = useSelector(state =>({
        // 현재 input값
        nowVal     : state.phoneData.data.rows.find(row=>row.id === id)[colName],
        // 현재 column의 최초 데이터, 추가버튼으로 추가된 row의 경우 null임
        firstVal   : state.phoneData.firstData.lastId < id 
                     ? null
                     : state.phoneData.firstData.rows.find(row=>row.id === id)[colName],
        // 현재 row의 값이 받아온 데이터의 lastId보다 크다면 true
        // 추가된 row인지 판별
        isAddedRow : state.phoneData.firstData.lastId < id
                     ? true
                     : false,

    }),shallowEqual);

    useEffect(()=>{
        return ref.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    //////////////////////
    const updateInputCompo = useCallback( (value) => 
        dispatch(phoneDataUpdate.Change(id,colName, value))
    ,[colName, dispatch, id]);
    
    // state를 바꿔주는 dispatch* change,delete //
    // const updateListInsert = callbackDispatch(phoneDataChangedList.Insert);



    const callbackDispatch = useCallback((dispatchFunc) =>{
        return(...args)=>{
            dispatch(dispatchFunc(...args));
        }
    },[dispatch]);
    const updateListUpdateChange = callbackDispatch(phoneDataChangedList.Update.Change);
    const updateListUpdateDelete = callbackDispatch(phoneDataChangedList.Update.Delete);
    const updateListAddChange = callbackDispatch(phoneDataChangedList.Add.Change);
    const updateListAddDelete = callbackDispatch(phoneDataChangedList.Add.Delete);
     ///////////////////////////////////////////////////////// 포커싱이 벗어났을 때
    const handleBlur = useCallback( () =>{
        const nowValue = nowVal || '';
        const deletedWord = nowValue.replace(deleteWord,"");

        const isPassRegTest = reg.test(deletedWord);
        const isNullValue = deletedWord=== " " || deletedWord ==="";
        const isRequiredValue = requiredInputValue.some(val=>val === colName);
        
        if( //    정규식 통과 못함   && 빈값이 아님.    ||   필수값인데 빈칸일경우
            ( isPassRegTest === false && !isNullValue ) ||( isRequiredValue && deletedWord ==="")
        ){
            isInvalid.current = true;
            showModal("잘못된 값입니다.", error);
        }
        //정규식을 통과할 경우(올바른 값일경우)
        else{
            isInvalid.current = false;
            // NOTE - commaValues에 포함될경우 콤마를 찍어줌
            const modifiedValue = commaValues.some(val => val === colName)
            ? utils.uncomma(deletedWord)
            : deletedWord;

            if( requiredInputValue.some(val=> val === colName)){
                commaValues.some(val => val === colName)
                ? updateInputCompo(utils.comma(modifiedValue))
                : updateInputCompo(modifiedValue)
            }
            // const firstValue = firstVal || '';
            const firstValue = firstVal === null ? '': firstVal;
            
            // 최초값과 수정한 값을 비교
            modifiedValue === firstValue   
                // 비교한 값이 같을 떄
                ? isAddedRow 
                    ? updateListAddDelete(id, colName) 
                    : updateListUpdateDelete(id, colName)    
                //비교한 값이 다를 때
                : isAddedRow 
                    ? updateListAddChange(id, colName, modifiedValue) 
                    : updateListUpdateChange(id, colName, modifiedValue)


        }
        
    },[nowVal, deleteWord, reg, colName, showModal, error, firstVal, isAddedRow, updateListUpdateDelete, id, updateListUpdateChange, updateInputCompo, updateListAddDelete, updateListAddChange]);

    const handleChange = useCallback( (e) => {
        const val = commaValues.some(val => val === colName)
                    ? utils.inputNumberFormat(e.target.value) // 콤마를 적어줌
                    : e.target.value; // 그냥 그대로 입력
        updateInputCompo(val);
    },[colName, updateInputCompo]);

    const handleOnFocus = useCallback( () =>{
        console.log("focus");
    },[]);

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
    console.log('first');
    return( 
        
        <InputWrap>
            <Modal isVisible={modalState.isVisible} title={modalState.modalTitle} onClickYes={handleOnclickYes} noCancel>
                {modalState.modalText}
            </Modal>
            <StyledInput onKeyUpCapture={handleKeyUp} onKeyDown={handleKeyDown}
                ref={el=>ref.current[id] = {...ref.current[id], [colIndex]:el} }
                textalign={textalign} 
                width={width} 
                // value={nowVal === null ? "" : nowVal }
                value={nowVal || "" }
                required={notRequiredInputValue.every(val => val !== colName) ? true : false}
                onChange={handleChange}
                onFocus={handleOnFocus}
                onBlur={handleBlur}
                isinvalid={+isInvalid.current}
            />
        </InputWrap>
    );
});
export default React.memo(Input);


const InputWrap = styled.div`
`;

const StyledInput = styled(animated.input)`
    box-sizing:border-box;
    /* outline:none; */
    /* border:0; */
    /* outline-color: #7abaff; */
    border: 1px solid #a3a3a3;
    ${({ width, textalign,isinvalid })=> css`
        width:${width};
        text-align:${textalign};
        outline-color:${isinvalid?"red":"#7abaff"};
    `}
`;