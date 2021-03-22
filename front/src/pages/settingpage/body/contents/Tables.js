import React, { createRef, useCallback, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import Row from './Row';
import Button from '../../../../components/Button';
import { columnPhoneInfo } from '../../../../utils/propertyInfo';
import { phoneDataUpdate } from '../../../../modules/phoneData';
import Input from './Input';
import Column from './Column';

const StyledTable = styled.div`
    width:auto;
`;

// const StyledRow = styled.div`
//     text-align:center;
//     display:flex;
//     align-items:center;
// `;

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
//         `}
// `;

// const DeleteButton = styled(Button)`
//     background-color: #ff7787;
//     margin-right:5px;
//     color:white;
//     width:40px;

//     ${({top}) => top && css`
//         background-color:white;
//         color:white;
//         width:40px;
//     `}
// `;

function Tables(){
    const dispatch = useDispatch();
    const rows = useSelector( state =>state.phoneData.data.rows);
    const columns = useMemo(() => columnPhoneInfo,[]);
    // // columns 정보
    // const columns = useMemo(() => columnPhoneInfo,[]);
    // // const inputsRef = useRef([]);

    // const handleDeleteButton = useCallback( (id) => {
    //         dispatch(phoneDataUpdate.Delete(id));
    // },[]);
    // console.log("tables");

    // const handleDeleteButton = (id) => {
    //         dispatch(phoneDataUpdate.Delete(id));
    // }
    // const inputsRef = useMemo(()=>
    //         Array(rows.length).fill(0).map(() => createRef()
    // ),[]);
    // console.log(inputsRef);

    return(
        <StyledTable>
            <Row key={`top_row_head`} top />
            {rows.map( (row,rowIdx) =>
                <Row key={`row_body_${row.id}`} rowId={row.id}>
                    {columns.map((column, colIndex)=>
                        <Column key={`row_${rowIdx}_${column.name}`} width={column.width} textalign={column.textalign}>
                            <Input   colIndex={colIndex} id={row.id} column={column} />
                        </Column>   
                    )}
                </Row> 
            )}
        </StyledTable>
    );
}
export default React.memo(Tables);