import React, { useCallback, useRef } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { phoneDataChange, phoneDataUpdateList} from '../../../../modules/phoneData';
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
    const firstVal = 1;

    const updateList = useSelector( state => state.phoneData.dataChangeList.dataUpdateList);
    // const updateListColumn = useSelector( state => state.phoneData.dataChangeList.dataUpdateList.rows[updateListRowIndex][column.colname]);

     ///////////////////////////////////////////////////////// 
    const inputChange = useCallback( (value) => {
        dispatch(phoneDataChange(id,column.colname, value))
    },[column.colname, dispatch, id]);
    const updateListRowInsert = useCallback((id) => {
        dispatch(phoneDataUpdateList.RowInsert(id));
    },[]);
    const updateListRowDelete = useCallback((id) => {
        dispatch(phoneDataUpdateList.RowDelete(id));
    },[]);
    const updateListColumnInsert = useCallback((id,colName) => {
        dispatch(phoneDataUpdateList.ColumnInsert(id,colName));
    },[]);
    const updateListColumnDelete = useCallback((id,colName) => {
        dispatch(phoneDataUpdateList.ColumnDelete(id,colName));
    },[]);
    const updateListColumnChange = useCallback((id,colName) => {
        dispatch(phoneDataUpdateList.ColumnChange(id,colName));
    },[]);
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
        //최종 수정값
        const deletedWord = e.target.value.replace(validCheck.deleteWord,"");
        // 해당 column에 해당하는 정규식 통과 못 할 경우(올바르지 않은 값일 경우)
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
        //정규식을 통과할 경우(올바른 값일경우)
        else{
            // NOTE - commaValues에 포함될경우 콤마를 찍어줌
            const modifiedValue = commaValues.some(val => val === column.colname)
            ? utils.comma(deletedWord)
            : deletedWord;
            const firstValue = firstVal === null ? '': firstVal;
            inputChange(modifiedValue);
            

            const updateRowIndex = updateList.findIndex( val=>val.id === id );
            // NOTE - 이 if문은 column값이 수정 됐는지 확인한다.
            //처음이랑 수정된 값이 같을 경우
            if( modifiedValue === firstValue){
                // 리스트에 해당 row가 비어있지 않으면
                if( updateRowIndex !== -1){
                    const updateListColumn = updateList[updateRowIndex][column.colname];
                    //TODO - update리스트에서 해당 column 제거
                }
            }
            //처음이랑 수정된 값이 다를 경우
            else{
                // 리스트에 해당 row가 비어있지 않으면
                if(updateRowIndex === -1){
                    //TODO - row, col 모두 넣어줌.
                    // updateListRowInsert();
                    // updateListColumnInsert();
                }
                //리스트에 해당 row가 비어있으면
                else{
                    const updateListColumn = updateList[updateRowIndex][column.colname];
                    // updatelist에 해당 column이 없을 경우
                    if(updateListColumn === null){
                        //TODO - 해당 column을 updatelist의 row에 넣음
                    }
                    //updatelist에 해당 column이 있을 경우
                    else{
                        //TODO - 해당 column의 값을 변경해줌.
                    }
                }
            }
        }
        
    },[column.colname, firstVal, id, inputChange, nowVal, updateList, validCheck.deleteWord, validCheck.error, validCheck.reg]);
    

    return( 
        <StyledInput 
            textalign={column.textalign} 
            width={column.width} 
            value={nowVal === null ? '': nowVal }
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