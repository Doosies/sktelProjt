import React, { forwardRef, useCallback } from 'react'
import { useDispatch} from 'react-redux';
import styled, {  } from 'styled-components';
import DeleteButton from '../../../../components/DeleteButton';
import {  phoneDataUpdate } from '../../../../modules/phoneData';
import { columnPhoneInfo } from '../../../../utils/propertyInfo';
import Column from './Column';
import Input from './Input';

const StyledRow = styled.div`
    text-align:center;
    display:flex;
    align-items:center;
`;

const Row = ({top=false, rowId, rowIndex, changeRefsRow}) =>{
    // console.log("rowRender",top,rowId,itemsRef);
    const dispatch = useDispatch();

    // const setEle = (rowIdx,colIdx,element) =>{
    //     const ele = changeRefsRow(rowIdx,colIdx,element);
    //     // console.log(ele.current);
    //     return ele;
    // }

    const handleDeleteButton = useCallback( (id) => {
            dispatch(phoneDataUpdate.Delete(id));
    },[]);

    if( top ) return(
        <StyledRow>
        {/* {testRefs.map(val=>val.id)} */}
            <DeleteButton top/>
            {columnPhoneInfo.map((column)=>
                <Column  key={`head_${column.name}`} width={column.width} top>
                    {column.name}
                </Column>
            )}
        </StyledRow>

    );
    return( 
        <StyledRow >
            <DeleteButton onClick={()=>handleDeleteButton(rowId)}> delete </DeleteButton>
            {columnPhoneInfo.map((column, colIndex)=>
                <Column key={`row_${rowId}_${column.name}`} width={column.width} textalign={column.textalign}>
                    <Input ref={((ele)=>changeRefsRow(rowIndex,colIndex,ele))()} colIndex={colIndex} id={rowId} column={column} />
                </Column>   
            )}
        </StyledRow>
    );
}

export default React.memo(Row, 
    (prev,next)=>{
        return prev.top === next.top
    });
