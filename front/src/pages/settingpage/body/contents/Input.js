import React, { useCallback, useRef } from 'react';
import { useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { phoneDataUpdateList, phoneDataUpdate} from '../../../../modules/phoneData';
import { columnPhoneInfo, inputValidCheck } from '../../../../utils/propertyInfo';
import * as utils from '../../../../utils/utils';


const StyledInput = styled.input`
    ${({ width, textalign })=>css`
        width:${width};
        text-align:${textalign};
    `}
`;
// 필수 입력 항목이 아닌것들
const notRequired = [
    "battery", "screen_size", "storage"
];
// 콤마 찍을 값들
const commaValues = [
    "shipping_price", "battery",  "storage"
]


function Input({colIndex, id}){
    console.log("인풋");
    const dispatch = useDispatch();
    // 포커싱 위한 ref
    const inputRef = useRef();
    // alert 두번 나오는거 방지 위한 ref
    const didShowAlert = useRef(false);
    const test = useRef(1);
    // 현재 data의 column 정보
    const nowColumnInfo = columnPhoneInfo[colIndex];
    const nowColumnValidCheck = inputValidCheck[colIndex];
    
    const { rowIndex, updateListRowIndex } = useSelector(state=>({
        // 현재 data의 row index 
        rowIndex           : state.phoneData.data.rows.findIndex( val=>val.id === id ),
        // update list의 row index
        updateListRowIndex : ''//state.phoneData.dataChangeList.dataUpdateList.findIndex( val=>val.id === id )
    }),shallowEqual);
    
    const { nowVal, firstVal, updatedVal } = useSelector(state =>({
        nowVal     : state.phoneData.data.rows[ rowIndex ][ nowColumnInfo.colname ],
        // // 현재 column의 최초 데이터, 추가된 데이터의 경우 null임
        firstVal   : state.phoneData.firstData.lastId < id 
                     ? null
                     : state.phoneData.firstData.rows[ rowIndex ][nowColumnInfo.colname],
    // // 그 때는 값이 없기때문에 null처리.
        // updatedVal : updateListRowIndex === -1
        //               ? null
        //               : state.phoneData.dataChangeList.dataUpdateList[updateListRowIndex][nowColumnInfo.colname] 
    }),shallowEqual);
     
    const callbackDispatch = useCallback((dispatchFun) =>{
        return(...args)=>{
            dispatch(dispatchFun(...args));
        }
    },[dispatch]);
    const inputChange = useCallback( (value) => 
        dispatch(phoneDataUpdate.Change(id,nowColumnInfo.colname, value))
    ,[nowColumnInfo.colname, dispatch, id]);
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const updateListChange = callbackDispatch(phoneDataUpdateList.Change);
    const updateListDelete = callbackDispatch(phoneDataUpdateList.Delete);
    // const updateListColumnDelete = callbackDispatch(phoneDataUpdateList.ColumnDelete);
    // const updateListColumnChange = callbackDispatch(phoneDataUpdateList.ColumnChange);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleChange = useCallback( (e) => {
        // commaValue에 포함될 경우
        const val = commaValues.some(val => val === nowColumnInfo.colname)
                    ? utils.inputNumberFormat(e.target.value) // 콤마를 적어줌
                    : e.target.value; // 그냥 그대로 입력
        inputChange(val);
    },[nowColumnInfo.colname, inputChange]);

     ///////////////////////////////////////////////////////// 포커싱이 벗어났을 때
    const handleBlur = useCallback( (e) =>{
        //최종 수정값
        const deletedWord = e.target.value.replace(nowColumnValidCheck.deleteWord,"");
        // 해당 column에 해당하는 정규식 통과 못 할 경우(올바르지 않은 값일 경우)
        if( nowColumnValidCheck.reg.test(deletedWord) === false){
            // 포커싱이 바뀌어도 다시 포커싱해줌.
            inputRef.current.focus();
            // alert 두번 나오는거 버그 수정 위한 if문
            if ( !didShowAlert.current) {
                alert(nowColumnValidCheck.error);
                didShowAlert.current = false;
            } 
            didShowAlert.current = !didShowAlert.current;
        }
        //정규식을 통과할 경우(올바른 값일경우)
        else{
            // NOTE - commaValues에 포함될경우 콤마를 찍어줌
            const modifiedValue = commaValues.some(val => val === nowColumnInfo.colname)
            ? utils.comma(deletedWord)
            : deletedWord;
            const firstValue = firstVal === null ? '': firstVal;
            
            // NOTE - 이 if문은 column값이 수정 됐는지 확인한다.

            //처음이랑 수정된 값이 같을 경우
            if( modifiedValue === firstValue){
                // 리스트에 해당 row가 비어있지 않고 빈값이 아니면 column값 제거
                // if( updateListRowIndex !== -1 && Boolean(updatedVal)){
                updateListDelete(id, nowColumnInfo.colname);
                // }
            }
            //처음이랑 수정된 값이 다를 경우
            else{
                updateListChange(id, nowColumnInfo.colname, modifiedValue);
                // 리스트에 해당 row가 비어있으면 row를생성, column을 업데이트해줌
                // if(updateListRowIndex === -1){
                    // console.log(id, nowColumnInfo.colname, modifiedValue)
                    // updateListRowInsert(id, nowColumnInfo.colname, modifiedValue);   
                // }
                //리스트에 해당 row가 있고 값이 같지 않으면
                // if(updatedVal !== modifiedValue){
                    // updateListColumnChange(updateListRowIndex, nowColumnInfo.colname, modifiedValue);

                // }else 
                // if(updateListRowIndex === -1){
                    // console.log(id, nowColumnInfo.colname, modifiedValue)
                //  }
            }
        }
        
    },[nowColumnValidCheck.deleteWord, nowColumnValidCheck.reg, nowColumnValidCheck.error, firstVal, nowColumnInfo.colname, updateListDelete, id, updateListRowIndex, updateListChange]);
    

    return( 
        <StyledInput 
            textalign={nowColumnInfo.textalign} 
            width={nowColumnInfo.width} 
            value={nowVal === null ? '': nowVal }
            onChange={handleChange}
            onBlur={handleBlur}
            // notRequired에 있는 배열에 포함되면 필수항목이 아님.
            required={notRequired.every(val => val !== nowColumnInfo.colname) ? true : false}
            ref={inputRef}
            // placeholder={}
        />
    );
}
export default React.memo(Input);