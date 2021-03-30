import React, { forwardRef } from 'react';
import styled, {  } from 'styled-components';
import { useSelector } from "react-redux";
import Row from './Row';

const StyledTable = styled.div`
    width:100%;
    height:100%;
    /* flex:1; */
    overflow-x:auto;

`;

const TableHead = styled.div`
    background-color:hsl(0, 0%, 99%);
    padding-top:0;
    margin-bottom:50px;
    position:fixed;
    border-bottom: solid 1px;
`;

const TableBody = styled.div`
    /* width:100%;
    height:100%; */
    padding-top:50px;
    overflow-x:auto;
    overflow-y:auto;
`;



const Tables = forwardRef((_,ref) => {
    const rows = useSelector( state =>state.phoneData.data.rows);
    
    return(
        <StyledTable>
            <TableHead>
                <Row key={`top_row_head`} top />
            </TableHead>
            <TableBody>
                {rows.map( (row,i) =>
                    <Row ref={ref} rowIndex={i} key={`row_body_${row.id}`} rowId={row.id}/>
                )}
            </TableBody>
        </StyledTable>
    );
});

export default React.memo(Tables);