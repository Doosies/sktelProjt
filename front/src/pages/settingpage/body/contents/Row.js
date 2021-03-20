import React, { createRef, useCallback, useEffect, useMemo, } from 'react'
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import Button from '../../../../components/Button';
import { phoneDataAddRef, phoneDataUpdate } from '../../../../modules/phoneData';
import { columnPhoneInfo } from '../../../../utils/propertyInfo';
import Column from './Column';
import Input from './Input';

const StyledRow = styled.div`
    text-align:center;
    display:flex;
    align-items:center;
`;


const DeleteButton = styled(Button)`
    background-color: #ff7787;
    margin-right:5px;
    color:white;
    width:40px;
    
    ${({top}) => top && css`
        background-color:white;
        color:white;
        width:40px;
    `}
`;

function Row({top, rowId}){
    // console.log("row",rowId,"top: ",top);
    const dispatch = useDispatch();
    // columns 정보
    const columns = useMemo(() => columnPhoneInfo,[]);
    const inputsRef = !top && Array(8).fill(0).map(() => createRef());

    useEffect(()=> {
        console.log(rowId,top);
        !top &&
            dispatch(phoneDataAddRef(rowId,inputsRef));

        return ()=>{
            console.log("없어져",rowId);
            // const arr = Object.entries(inputsRef);
            // arr.forEach( (ele,key) => {
            //         inputsRef[key].current =1;
            //     }
            // )
        };
            // console.log(aa)
            
            // console.log(inputsRef[0]);
    
    },[dispatch, inputsRef, rowId, top]);

    const handleDeleteButton = useCallback( (id) => {
            // 제거 누른 id는 data.rows 에서 제거함.
            // 그리고 dataAddList 배열에 겹치는 값이 없을 경우에만 
            // data.changeDatalist.dataDeleteList에 추가함
            dispatch(phoneDataUpdate.Delete(id));
        },[dispatch]);

    if( top ) return(
        <StyledRow>
            <DeleteButton top/>
            {columns.map((column)=>
                <Column  key={`head_${column.name}`} width={column.width} top>
                    {column.name}
                </Column>
            )}
        </StyledRow>

    );
    return( 
        <StyledRow>
            <DeleteButton onClick={()=>handleDeleteButton(rowId)}> 삭제 </DeleteButton>
            {columns.map((column, index)=>
                <Column key={`row_${rowId}_${column.name}`} width={column.width} textalign={column.textalign}>
                    <Input  ref={inputsRef[index] } colIndex={index} id={rowId} column={column} />
                    {/* <Input colIndex={index} id={rowId} column={column} /> */}
                </Column>   
            )}
        </StyledRow>
    );
}
export default React.memo(Row);