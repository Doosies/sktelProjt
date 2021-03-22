import React, { createRef, forwardRef, useCallback, useEffect, useMemo, useRef, useState, } from 'react'
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

const StyledColumn = styled.div`
    border-bottom: solid 1px;
    padding-top:10px;
    padding-bottom:10px;
    padding-left:5px;
    padding-right:5px;
    font-size:12px;
    height:20px;

    width: 100px;
    ${props=>css` 
        width: ${props.width}; 
        text-align:${props.textalign};
    `}

    /* 제일 상단에 있는 column일 경우 */
    ${({ top }) => top && 
        css `
            padding-top:15px;
            padding-bottom:15px;
            font-size:15px;
            font-weight:bold;
    `}
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

const Row = forwardRef(({top, rowId, children},inputsRef) =>{
    //test
    // const [inputsRef, setTestRefs] = useState([]);


    const dispatch = useDispatch();
    // columns 정보
    const columns = useMemo(() => columnPhoneInfo,[]);
    // const inputsRef = useMemo(()=>
    //     !top && 
    //         Array(8).fill(0).map(() => createRef()
    // ),[]);

    // useEffect(()=>{
    //     // inputsRef = Array(8).fill(0).map(() => createRef());
    //     console.log(inputsRef);
    // },[]);
    // console.log(refs)
    // const inputsRef = useRef({});
    // console.log(inputsRef);
    const handleDeleteButton = useCallback( (id) => {
            dispatch(phoneDataUpdate.Delete(id));
    },[]);

    if( top ) return(
        <StyledRow>
        {/* {testRefs.map(val=>val.id)} */}
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
            <DeleteButton onClick={()=>handleDeleteButton(rowId)}> delete </DeleteButton>
            {children}
        </StyledRow>
    );
});
export default React.memo(Row);
