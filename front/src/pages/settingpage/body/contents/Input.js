import React, { useCallback, useRef } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { phoneDataChange } from '../../../../modules/phoneData';
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
    const dispatch = useDispatch();
    // 포커싱 위한 ref
    const inputRef = useRef();
    // alert 두번 나오는거 방지 위한 ref
    const didShowAlert = useRef(false);
    // 몇번쨰 줄인지 알기위해
    const column = useMemo(() => columnPhoneInfo[colIndex],[colIndex]);//useSelector( state => state.phoneData.columnProperties);
    const validCheck = useMemo(()=> inputValidCheck[colIndex],[colIndex]);
    const rowIndex = useSelector(state => state.phoneData.data.rows.findIndex( val=>val.id === id ));
    const nowVal = useSelector(state => state.phoneData.data.rows[ rowIndex ][ column.colname ]);
    const nowVal2 = useSelector( state => state.phoneData.firstData.rows[ rowIndex ][ column.colname ]);

     ///////////////////////////////////////////////////////// input state 변경
    const inputChange = useCallback( (value) => {
        dispatch(phoneDataChange(id,column.colname, value))
    },[column.colname, dispatch, id]);

    ///////////////////////////////////////////////////////// 값이 바뀌었을떄
    const handleChange = useCallback( (e) => {
        // commaValue에 포함될 경우
        const val = commaValues.some(val => val === column.colname)
                    ? utils.inputNumberFormat(e.target.value) // 콤마를 적어줌
                    : e.target.value; // 그냥 그대로 입력
        inputChange(val);
    },[column.colname, inputChange]);

     ///////////////////////////////////////////////////////// 포커싱이 벗어났을 때
    const handleBlur = useCallback( (e) =>{
        const deletedWord = e.target.value.replace(validCheck.deleteWord,"");
        // 해당 column에 해당하는 정규식 통과 못 할 경우
        if( validCheck.reg.test(deletedWord) === false){
            // 포커싱이 바뀌어도 다시 포커싱해줌.
            inputRef.current.focus();
            // alert 두번 나오는거 버그 수정 위한 if문
            if ( !didShowAlert.current) {
                alert(validCheck.error);
                inputChange(nowVal);
                didShowAlert.current = false;
            } 
            didShowAlert.current = !didShowAlert.current;
        }
        //정규식을 통과할 경우
        else{
            // NOTE - commaValues에 포함될경우 콤마를 찍어서 출력함.
            commaValues.some(val => val === column.colname)
            ? inputChange(utils.comma(deletedWord))
            : inputChange(deletedWord)

            // NOTE - column값이 수정 됐는지 확인한다.
            // if( val === )
        }
        
    },[column.colname, inputChange, nowVal, validCheck.deleteWord, validCheck.error, validCheck.reg]);
    

    return( 
        <StyledInput 
            textalign={column.textalign} 
            width={column.width} 
            value={nowVal === null ? '': nowVal}
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