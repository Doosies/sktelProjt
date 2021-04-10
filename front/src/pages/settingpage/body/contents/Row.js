import { animated } from '@react-spring/web';
import React, { forwardRef, useCallback } from 'react'
import { useDispatch} from 'react-redux';
import styled, { } from 'styled-components';
import Button from '../../../../components/Button';
import {  phoneDataUpdate } from '../../../../modules/phoneData';
import { columnPhoneInfo } from '../../../../utils/propertyInfo';
import Column from './Column';
import Input from './Input';


const Row = forwardRef(({top=false, rowId, rowStyle},inputRefs) =>{
    const dispatch = useDispatch();

    const handleDeleteButton = useCallback( (e,id) => {
        // console.log(id);\
        dispatch(phoneDataUpdate.Delete(id));
        delete inputRefs.current[rowId];

    },[dispatch, inputRefs, rowId]);


    if( top ) return(
        <StyledRow>
            <Button color="white" deleteButton top/>
            {columnPhoneInfo.map((column)=>
                <Column  key={`head_${column.name}`} width={column.width} top>
                    {column.name}
                </Column>
            )}
        </StyledRow>

    );
    return( 
        <StyledRow style={rowStyle}>
            <Button 
                color="white" 
                background_color="#ff7787" 
                deleteButton 
                onClick={(e)=>handleDeleteButton(e,rowId)} 
                onMouseDown={(e)=>{e.preventDefault()}} 
            > 
                삭제 
            </Button>
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



const StyledRow = styled(animated.div)`
    text-align:center;
    display:flex;
    align-items:center;
    align-items:center;
`;