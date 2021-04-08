import {  } from '@react-spring/core';
import { animated } from '@react-spring/web';
import React, { forwardRef, useCallback } from 'react'
import { useDispatch} from 'react-redux';
import styled, { } from 'styled-components';
import Button from '../../../../components/Button';
import {  phoneDataUpdate } from '../../../../modules/phoneData';
import { columnPhoneInfo } from '../../../../utils/propertyInfo';
import Column from './Column';
import Input from './Input';


const Row = forwardRef(({top=false, rowId, style},inputRefs) =>{
    const dispatch = useDispatch();

    const handleDeleteButton = useCallback( (id) => {
        dispatch(phoneDataUpdate.Delete(id));
        delete inputRefs.current[rowId];

    },[dispatch, inputRefs, rowId]);


    if( top ) return(
        <StyledRow top>
            {columnPhoneInfo.map((column)=>
                <Column  key={`head_${column.name}`} width={column.width} top>
                    {column.name}
                </Column>
            )}
            <Button color="white" deleteButton top/>
        </StyledRow>

    );
    return( 
        <StyledRow>
            {columnPhoneInfo.map((column, colIndex)=>
                <Column key={`row_${rowId}_${column.name}`} width={column.width} textalign={column.textalign}>
                    <Input ref={inputRefs} colIndex={colIndex} id={rowId} width={column.width} column={column} />
                </Column>   
            )}
            <Button color="white" background_color="#ff7787" onClick={()=>handleDeleteButton(rowId)} deleteButton> 삭제 </Button>
        </StyledRow>
    );
});

export default React.memo(Row, 
    (prev,next)=>{
        return prev.top === next.top
    });



const StyledRow = styled.div`
text-align:center;
display:flex;
align-items:center;
align-items:center;
`;