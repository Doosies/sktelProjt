import React, {forwardRef, useCallback,  useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled, {  css } from 'styled-components';
import Modal from '../../../../components/Modal';
import Portal from '../../../../components/Portal';
import { phoneDataChangedList, phoneDataUpdate} from '../../../../modules/phoneData';
import { columnPhoneInfo, commaValues, notRequiredInputValue, requiredInputValue } from '../../../../utils/propertyInfo';
import * as utils from '../../../../utils/utils';

const InputWrap = styled.div`
`;
const StyledInput = styled.input`
    box-sizing:border-box;
    ${({ width, textalign })=>css`
        width:${width};
        text-align:${textalign};
    `}
`;

// const required = [
//     "model_name", "machine_name", "shipping_price", "maker", "created",
// ]
// // 필수 입력 항목이 아닌것들
// const notRequired = [
//     "battery", "screen_size", "storage"
// ];
// // 콤마 찍을 값들
// const commaValues = [
//     "shipping_price", "battery",  "storage"
// ]


const Input = forwardRef(({colIndex, id, width},ref) =>{
    // console.log(ref.current);
    // const ref = useRef();
    const [modalState, setModalState] = useState({
        showModal:false,
        modalTitle:"",
        modalText:"",
    });

    const dispatch = useDispatch();
    // alert 두번 나오는거 방지 위한 ref
    const didShowAlert = useRef(false);
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
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // state를 바꿔주는 dispatch* change,delete //
    // const updateListInsert = callbackDispatch(phoneDataChangedList.Insert);
    const updateListUpdateChange = callbackDispatch(phoneDataChangedList.Update.Change);
    const updateListUpdateDelete = callbackDispatch(phoneDataChangedList.Update.Delete);
    const updateListAddChange = callbackDispatch(phoneDataChangedList.Add.Change);
    const updateListAddDelete = callbackDispatch(phoneDataChangedList.Add.Delete);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleChange = useCallback( (e) => {
        const val = commaValues.some(val => val === nowColumnInfo.colName)
                    ? utils.inputNumberFormat(e.target.value) // 콤마를 적어줌
                    : e.target.value; // 그냥 그대로 입력
        updateInputCompo(val);
    },[nowColumnInfo.colName, updateInputCompo]);

    const handleOnFocus = useCallback( () =>{
        didShowAlert.current=false;
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
            // didShowAlert 는 alert 두번 나오는 버그 고치기 위해 넣어줌.
            // if( didShowAlert.current === false ){
                // alert(nowColumnInfo.error);
                setModalState({...modalState, 
                    modalTitle:"잘못된 값입니다.", 
                    modalText:nowColumnInfo.error, 
                    showModal:true});
                // didShowAlert.current = true;
            // }
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
        
    },[nowVal, nowColumnInfo, modalState, firstVal, isAddedRow, updateListUpdateDelete, id, updateListUpdateChange, updateInputCompo, updateListAddDelete, updateListAddChange]);

    const handleOnclickYes = () =>{
        setModalState({...modalState, 
            showModal:false});
        ref.current[id][colIndex].focus();
        updateInputCompo(firstVal);
        didShowAlert.current=true;
    }
    return( 
        <InputWrap>
            {modalState.showModal && 
                <Portal elementId="modal-root">
                    <Modal title={modalState.modalTitle} onClickYes={handleOnclickYes} noCancel>
                        {modalState.modalText}
                    </Modal>
                </Portal>
            }
            <StyledInput 
                ref={el=>ref.current[id] = {...ref.current[id], [colIndex]:el} }
                textalign={nowColumnInfo.textalign} 
                width={width} 
                value={nowVal === null ? "" : nowVal }
                required={notRequiredInputValue.every(val => val !== nowColumnInfo.colName) ? true : false}
                onChange={handleChange}
                onFocus={handleOnFocus}
                onBlur={handleBlur}
                // placeholder={}
            />
            
        </InputWrap>
    );
});
export default React.memo(Input);