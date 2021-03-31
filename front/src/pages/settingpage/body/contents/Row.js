import React, { forwardRef, useCallback, useEffect } from 'react'
import { useDispatch} from 'react-redux';
import styled, { css } from 'styled-components';
import DeleteButton from '../../../../components/DeleteButton';
import {  phoneDataUpdate } from '../../../../modules/phoneData';
import { columnPhoneInfo } from '../../../../utils/propertyInfo';
import Column from './Column';
import Input from './Input';

const StyledRow = styled.div`
    /* box-sizing:border-box; */
    text-align:center;
    display:flex;
    align-items:center;
    align-items:center;
    /* width:100%;
    height:100%; */
    /* flex:1; */
    /* border-bottom: solid 1px; */
    /* padding-top:50px; */
   

`;

const Row = forwardRef(({top=false, rowId},inputRefs) =>{
    const dispatch = useDispatch();

    const handleDeleteButton = useCallback( (id) => {
        dispatch(phoneDataUpdate.Delete(id));
        delete inputRefs.current[rowId];

    },[dispatch, inputRefs, rowId]);

    if( top ) return(
        <StyledRow top>
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
            <DeleteButton onClick={()=>handleDeleteButton(rowId)}> 삭제 </DeleteButton>
            {columnPhoneInfo.map((column, colIndex)=>
                <Column key={`row_${rowId}_${column.name}`} width={column.width} textalign={column.textalign}>
                    <Input ref={inputRefs} colIndex={colIndex} id={rowId} width={column.width} column={column} />
                </Column>   
            )}
        </StyledRow>
    );
});

export default React.memo(Row, 
    (prev,next)=>{
        return prev.top === next.top
    });
