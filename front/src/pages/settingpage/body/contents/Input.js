import React, { useCallback, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { phoneDataChange } from '../../../../modules/phoneData';


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
const commaValues = [
    "shipping_price", "battery",  "storage"
]

function inputNumberFormat(value) {
    return comma(uncomma(value));
}
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

function Input({colIndex, id}){
    const dispatch = useDispatch();
    // 포커싱 위한 ref
    const inputRef = useRef();
    // alert 두번 나오는거 방지 위한 ref
    const didShowAlert = useRef(false);
    // 몇번쨰 줄인지 알기위해
    const rowIndex = useSelector(state => state.phoneData.data.rows.findIndex( val=>val.id === id ));
    const column = useSelector( state => state.phoneData.columnProperties[colIndex]);

    const {validCheck, val} = useSelector(state =>({
        // column:state.phoneData.columnProperties[colIndex],
        validCheck:state.phoneData.inputValidCheck[colIndex],
        val:state.phoneData.data.rows[ rowIndex][ column.colname ],
    }),shallowEqual);

     ///////////////////////////////////////////////////////// input state 변경
    const inputChange = useCallback( (value) => {
        dispatch(phoneDataChange(id,column.colname, value))
    },[column.colname, dispatch, id]);

    ///////////////////////////////////////////////////////// 값이 바뀌었을떄
    const handleChange = useCallback( (e) => {
        // commaValue에 포함될 경우
        const val = commaValues.some(val => val === column.colname)
                    ? inputNumberFormat(e.target.value)
                    : e.target.value;
        inputChange(val);
        console.log(val);
    },[column.colname, inputChange]);

     ///////////////////////////////////////////////////////// 포커싱이 벗어났을 때
    const handleBlur = useCallback( (e) =>{
        const deletedWord = e.target.value.replace(validCheck.deleteWord,"");
        // 정규식 통과 못 할 경우
        if( validCheck.reg.test(deletedWord) === false){
            inputRef.current.focus();
            // alert 두번 나오는거 수정 위한 if문
            if ( !didShowAlert.current) {
                alert(validCheck.error);
                inputChange('val');
              didShowAlert.current = false;
            } 
            didShowAlert.current = !didShowAlert.current;
        }
        // 만약 column이 shipping_price일 경우 콤마를 찍고 출력함.
        if( column.colname === 'shipping_price') inputChange(comma(deletedWord));    
        else inputChange(deletedWord);
        
    },[column.colname, inputChange, validCheck.deleteWord, validCheck.error, validCheck.reg]);
    

    return( 
        <StyledInput 
            textalign={column.textalign} 
            width={column.width} 
            value={val === null ? '': val}
            onChange={handleChange}
            onBlur={handleBlur}
            // notRequired에 있는 배열에 포함되면 필수항목이 아님.
            required={notRequired.every(val => val !== column.colname) ? true : false}
            ref={inputRef}
            // placeholder={}
        />
    );
}
export default React.memo(Input);