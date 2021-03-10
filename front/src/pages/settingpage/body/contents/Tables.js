import React, {useEffect} from 'react';
import styled from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Row from './Row';
import { phoneDataFetchAsync } from '../../../../modules/phoneData';

const StyledTable = styled.div`
    width:auto;
`;

function Tables(){
    console.log("tables 렌더");
    const {rows, error,loading} = useSelector( state =>({
        rows: state.phoneData.data.rows,
        loading:state.phoneData.state.loading,
        error:state.phoneData.state.error,
    }), shallowEqual);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(phoneDataFetchAsync());
    },[dispatch]);
    

    if(loading) return null;
    if(error) return <div>에러 발생</div>;
    if( !rows ) return <div>데이터 로딩 실패</div>;

    return(
        <StyledTable>
            <Row key={`row_head`} top />
            {rows.map(row=>
                <Row key={`row_body_${row.id}`} row={row} /> 
            )}
        </StyledTable>
    );
}
export default React.memo(Tables);