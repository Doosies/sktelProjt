import React, { createRef, useMemo} from 'react';
import styled, {  } from 'styled-components';
import { useSelector } from "react-redux";
import Row from './Row';

const StyledTable = styled.div`
    width:auto;
`;


function Tables({itemsRef}){
    console.log(("taableRender"));
    const rows = useSelector( state =>state.phoneData.data.rows);
    const refs = useMemo( ()=> new Array(rows.length).fill().map(()=>new Array(8).fill().map(()=>createRef())),[rows.length]);

    // const itemsRef = useRef([]);
    // useEffect(()=>{
    //     // itemsRef.current = itemsRef.current.slice(0, rows.length);
    //     itemsRef.current = itemsRef.current.slice(0, 49);
    //     console.log("!");
    // },[]);

//{/* <Row  ref={itemsRef.current[i]} key={`row_body_${row.id}`} rowId={row.id} onClickDeleteButton={onClickDeleteButton}/> */}
    return(
        <StyledTable>
            <Row key={`top_row_head`} top />
            {rows.map( (row,i) =>
                <Row  itemsRef={itemsRef[i]} key={`row_body_${row.id}`} rowId={row.id}/>
            )}
        </StyledTable>
    );
}
export default React.memo(Tables);