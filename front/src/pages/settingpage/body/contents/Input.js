import React, {useCallback,  useRef } from 'react';
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


const Input = ({colIndex, id,}) =>{
    // console.log("input.js");
    // console.log(ref());
    // const inputRef = useRef('');
    const ref = useRef();
    const dispatch = useDispatch();
    // alert 두번 나오는거 방지 위한 ref
    const didShowAlert = useRef(false);
    // 현재 data의 column 정보와 검증값
    const nowColumnInfo = columnPhoneInfo[colIndex];
    const nowColumnValidCheck = inputValidCheck[colIndex];
    
    // console.log(nowRow);
    const { nowVal, firstVal, isAddedRow } = useSelector(state =>({
        // 현재 input값
        nowVal     : state.phoneData.data.rows.find(val=>val.id === id)[nowColumnInfo.colname],
        // 현재 column의 최초 데이터, 추가버튼으로 추가된 row의 경우 null임
        firstVal   : state.phoneData.firstData.lastId < id 
                     ? null
                     : state.phoneData.firstData.rows.find(val=>val.id===id)[nowColumnInfo.colname],
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
    const inputChange = useCallback( (value) => 
        dispatch(phoneDataUpdate.Change(id,nowColumnInfo.colname, value))
    ,[nowColumnInfo.colname, dispatch, id]);
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // state를 바꿔주는 dispatch* change,delete //
    const updateListChange = callbackDispatch(phoneDataUpdateList.Change);
    const updateListDelete = callbackDispatch(phoneDataUpdateList.Delete);
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
        if( nowColumnValidCheck.reg.test(deletedWord) === false 
        // 값이 빈값이고, 필수값일 경우
        || (deletedWord ==="" && notRequired.every(val=>val !== nowColumnInfo.colname))){
            // 포커싱이 바뀌어도 다시 포커싱해줌.
            // console.log(ref);
            ref.current.focus();
            // alert 두번 나오는거 버그 수정 위한 if문
            if ( !didShowAlert.current) {
                //안내문 출력
                alert(nowColumnValidCheck.error);
                //처음값으로 되돌려버림
                inputChange(firstVal);
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
            // const firstValue = firstVal || '';
            const firstValue = firstVal === null ? '': firstVal;
            
            // NOTE - 이 if문은 column값이 수정 됐는지 확인한다.
            // 새로 추가한 row가 아닐경우
            if( !isAddedRow ) modifiedValue === firstValue              
            ?updateListDelete(id, nowColumnInfo.colname)                // 최초값과 수정한 값이 같을경우, delete
            :updateListChange(id, nowColumnInfo.colname, modifiedValue);// 최초값과 수정한 값이 다를경우, change
            
            inputChange(modifiedValue);
        }
        
    },[firstVal, id, inputChange, isAddedRow, nowColumnInfo.colname, nowColumnValidCheck.deleteWord, nowColumnValidCheck.error, nowColumnValidCheck.reg, ref, updateListChange, updateListDelete]);

    return( 
        <StyledInput 
            textalign={nowColumnInfo.textalign} 
            width={nowColumnInfo.width} 
            value={nowVal === null ? '': nowVal }
            onChange={handleChange}
            onBlur={handleBlur}
            // notRequired에 있는 배열에 포함되면 필수항목이 아님.
            required={notRequired.every(val => val !== nowColumnInfo.colname) ? true : false}
            ref={ref}
            // placeholder={}
        />
    );
}
export default React.memo(Input);