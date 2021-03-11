import React, { useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    // 포커싱 위한 ref
    const inputRef = useRef();
    // alert 두번 나오는거 방지 위한 ref
    const didShowAlert = useRef(false);

    const dispatch = useDispatch();
    const column = useSelector( state => state.phoneData.columnProperties[colIndex]);
    const validCheck = useSelector( state=> state.phoneData.inputValidCheck[colIndex]);
    const  val  = useSelector( state => state.phoneData.data.rows
            [ state.phoneData.data.rows.findIndex( val=>val.id === id )]
            [ column.colname ] 
    );

     ///////////////////////////////////////////////////////// input state 변경
    const inputChange = useCallback( (value) => {
        dispatch(phoneDataChange(id,column.colname, value))
    },[column.colname, dispatch, id]);

    ///////////////////////////////////////////////////////// 값이 바뀌었을떄
    const handleChange = useCallback( (e) => {
        const val = column.colname==='shipping_price'
                    ? inputNumberFormat(e.target.value)
                    : e.target.value;
        inputChange(val);
    },[column.colname, inputChange]);

     ///////////////////////////////////////////////////////// 포커싱이 벗어났을 때
    const handleBlur = useCallback( (e) =>{
        console.log("blur", didShowAlert);
        const deletedWord = e.target.value.replace(validCheck.deleteWord,"");
        // 정규식 통과할 경우
        if( validCheck.reg.test(deletedWord) === false){
            inputRef.current.focus();
            if (didShowAlert.current) {
              didShowAlert.current = false;
            } else {
              didShowAlert.current = true;
                  alert(validCheck.error);
                  inputChange(val);
            }
        // 정규식 통과 못할 경우
        }else{
        }
        console.log("if문끝");
        // 만약 column이 shipping_price일 경우 콤마를 찍고 출력함.
        if( column.colname === 'shipping_price')
            inputChange(comma(deletedWord));    
        else inputChange(deletedWord);
        
    },[column.colname, inputChange, val, validCheck.deleteWord, validCheck.error, validCheck.reg]);
    

    return( 
        <StyledInput 
            textalign={column.textalign} 
            width={column.width} 
            value={val === null ? '': val}
            onFocus={ () => {console.log('main', 'focus');} }
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

// export default (Input);