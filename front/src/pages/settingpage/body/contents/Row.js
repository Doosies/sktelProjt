import { animated } from '@react-spring/web';
import React, { forwardRef, useCallback } from 'react'
import { useDispatch} from 'react-redux';
import styled, {  } from 'styled-components';
import Button from '../../../../components/Button';
import {  phoneDataUpdate } from '../../../../modules/phoneData';
import { columnPhoneInfo } from '../../../../utils/propertyInfo';
import Column from './Column';
import Input from './Input';


const Row = forwardRef(({top=false, rowId, rowStyle},inputRefs) =>{
    
    const dispatch = useDispatch();

    const handleDeleteButton = useCallback( () => {
        // console.log(id);\
        dispatch(phoneDataUpdate.Delete(rowId));
        delete inputRefs.current[rowId];

    },[dispatch, inputRefs, rowId]);

    return( 
        <StyledRow style={rowStyle}>

            {columnPhoneInfo.map((column, colIndex)=>
                <Column 
                    key={top ? `head_${column.name}` : `row_${rowId}_${column.name}`} 
                    width={column.width} 
                    top={top}
                >
                    { top
                        ? column.name
                        : <Input ref={inputRefs} colIndex={colIndex} id={rowId} width={column.width} column={column} />
                    }
                </Column>   
            )}
            <Button 
                color="white" 
                background_color="#ff7787" 
                deleteButton 
                onClick={(e)=>handleDeleteButton()} 
                onMouseDown={(e)=>{e.preventDefault()}} 
                top={top}
            > 
                삭제 
            </Button>
        </StyledRow>
    );
});

export default React.memo(Row, 
    (prevProps,nextProps)=>{
        return prevProps.top === nextProps.top;
    });


const StyledRow = styled(animated.div)`
    text-align:center;
    display:flex;
    justify-content:space-between;
    align-items:center;
`;
