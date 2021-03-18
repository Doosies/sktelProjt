import React, { createRef, useCallback, useMemo, } from 'react'
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import Button from '../../../../components/Button';
import { phoneDataUpdate } from '../../../../modules/phoneData';
import { columnPhoneInfo } from '../../../../utils/propertyInfo';
import Column from './Column';
import Input from './Input';

const StyledRow = styled.div`
    text-align:center;
    display:flex;
    align-items:center;
`;

// const StyledColumn = styled.div`
//     border-bottom: solid 1px;
//     padding-top:10px;
//     padding-bottom:10px;
//     padding-left:5px;
//     padding-right:5px;
//     font-size:12px;
//     height:20px;

//     width: 100px;
//     ${props=>css` 
//         width: ${props.width}; 
//         text-align:${props.textalign};
//     `}

//     /* 제일 상단에 있는 column일 경우 */
//     ${({ top }) => top && 
//         css `
//             padding-top:15px;
//             padding-bottom:15px;
//             font-size:15px;
//             font-weight:bold;
//     `}
// `;


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
    // console.log(("row"));
    const dispatch = useDispatch();
    // console.log
    // columns 정보
    const columns = useMemo(() => columnPhoneInfo,[]);//useSelector( state => state.phoneData.columnProperties);
    // const refData = useSelector(state=>state.phoneData.refData);
    const inputsRef = !top && Array(7).fill(0).map(() => createRef());
    // const inputsRef = useRef();
    // coinputsR
    // console.log(inputsRef);

    // useEffect(()=>{
    //     dispatch(phoneDataAddRef(rowId,inputsRef.current))
    // },[]);

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
                <Column key={`row${rowId}_${column.name}`} width={column.width} textalign={column.textalign}>
                    {/* <Input  ref={inputsRef[index] } colIndex={index} id={rowId} column={column} /> */}
                    <Input colIndex={index} id={rowId} column={column} />
                </Column>   
            )}
        </StyledRow>
    );
}
export default React.memo(Row);