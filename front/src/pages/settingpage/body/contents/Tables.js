import React, {} from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import Row from './Row';

const StyledTable = styled.div`
    width:auto;
`;

function Tables(){
    const rows = useSelector( state =>state.phoneData.data.rows);

    return(
        <StyledTable>
            <Row key={`row_head`} top />
            {rows.map( (row) =>
                <Row key={`row_${row.id}`} rowId={row.id}/> 
            )}
        </StyledTable>
    );
}
export default React.memo(Tables);