import React, {useCallback,  useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { phoneDataChangedList, phoneDataUpdate} from '../../../../modules/phoneData';
import { columnPhoneInfo } from '../../../../utils/propertyInfo';
import * as utils from '../../../../utils/utils';


const StyledInput = styled.input`
    ${({ width, textalign })=>css`
        width:${width};
        text-align:${textalign};
    `}
`;
// {name:"기기명", width:"200px", colName:"model_name", textalign:"left"},
// {name:"모델명", width:"180px", colName:"machine_name", textalign:"left"},
// {name:"출고가", width:"70px", colName:"shipping_price", textalign:"right"},
// {name:"브랜드", width:"100px", colName:"maker", textalign:"center"},
// {name:"출시일", width:"100px", colName:"created", textalign:"center"}
const required = [
    "model_name", "machine_name", "shipping_price", "maker", "created",
]
// 필수 입력 항목이 아닌것들
const notRequired = [
    "battery", "screen_size", "storage"
];
// 콤마 찍을 값들
const commaValues = [
    "shipping_price", "battery",  "storage"
]


const Input = ({colIndex, id}) =>{
    // console.log("input.js");
    const ref = useRef();
    const dispatch = useDispatch();
    // alert 두번 나오는거 방지 위한 ref
    const didShowAlert = useRef(false);
    // 현재 data의 column 정보와 검증값
    const nowColumnInfo = columnPhoneInfo[colIndex];
    // const nowColumnValidCheck = columnPhoneInfo[colIndex];
    // console.log(nowColumnInfo, nowColumnValidCheck);
    
    // console.log(nowRow);
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
        // commaValue에 포함될 경우
        const val = commaValues.some(val => val === nowColumnInfo.colName)
                    ? utils.inputNumberFormat(e.target.value) // 콤마를 적어줌
                    : e.target.value; // 그냥 그대로 입력
        updateInputCompo(val);
    },[nowColumnInfo.colName, updateInputCompo]);

     ///////////////////////////////////////////////////////// 포커싱이 벗어났을 때
    const handleBlur = useCallback( (e) =>{
        //최종 수정값
        const deletedWord = e.target.value.replace(nowColumnInfo.deleteWord,"");
        // const uncommaWord = utils.uncomma(deletedWord);
        // 해당 column에 해당하는 정규식 통과 못 할 경우(올바르지 않은 값일 경우)
            // 또는 값이 빈값이고, 필수값일 경우
        if( (nowColumnInfo.reg.test(deletedWord) === false )
        || ( (deletedWord=== " " || deletedWord ==="") && notRequired.every(val=>val !== nowColumnInfo.colName)))
        
        {
            // 포커싱이 바뀌어도 다시 포커싱해줌.
            ref.current.focus();
            // alert 두번 나오는거 버그 수정 위한 if문
            if ( !didShowAlert.current) {
                //안내문 출력
                alert(nowColumnInfo.error);
                //처음값으로 되돌려버림
                // didShowAlert.current = true;
                updateInputCompo(firstVal);
                didShowAlert.current = !didShowAlert.current;
            } 
        }
        //정규식을 통과할 경우(올바른 값일경우)
        else{
            // NOTE - commaValues에 포함될경우 콤마를 찍어줌
            const modifiedValue = commaValues.some(val => val === nowColumnInfo.colName)
            ? utils.uncomma(deletedWord)
            : deletedWord;
            // const firstValue = firstVal || '';
            const firstValue = firstVal === null ? '': firstVal;
            //만약 수정을 거친 값이 내가 입력한 값과 다르면 
            // input 태그를 업데이트 해준다.
            // if (modifiedValue !== nowVal) updateInputCompo(modifiedValue);
            
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
        }
        
    },[nowColumnInfo.deleteWord, nowColumnInfo.reg, nowColumnInfo.colName, updateInputCompo, firstVal, isAddedRow, updateListUpdateDelete, id, updateListUpdateChange, updateListAddDelete, updateListAddChange]);

    return( 
        <StyledInput 
            textalign={nowColumnInfo.textalign} 
            width={nowColumnInfo.width} 
            value={nowVal === null ? "" : nowVal }
            onChange={handleChange}
            onBlur={handleBlur}
            // notRequired에 있는 배열에 포함되면 필수항목이 아님.
            required={notRequired.every(val => val !== nowColumnInfo.colName) ? true : false}
            ref={ref}
            // placeholder={}
        />
    );
}
export default React.memo(Input);