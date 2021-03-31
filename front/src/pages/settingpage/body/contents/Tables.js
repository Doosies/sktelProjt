import React, { forwardRef, useEffect, useLayoutEffect } from 'react';
import styled, {  } from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Row from './Row';
import { phoneDataFetchAsync } from '../../../../modules/phoneData';

const StyledTable = styled.div`
    position:relative;
    width:100%;
    height:100%;
    
    overflow-y:auto;

`;

const TableHead = styled.div`
    position:absolute;
    background-color:hsl(0, 0%, 100%);
    padding-top:0;
    margin-bottom:50px;
    border-bottom: solid 1px;
`;

const TableBody = styled.div`
    padding-top:50px;
`;



const Tables = forwardRef((_,ref) => {
    // console.log("table");
    const { rows, error,loading} = useSelector( state =>({
        rows: state.phoneData.data.rows,
        loading:state.phoneData.state.loading,
        error:state.phoneData.state.error,
    }), shallowEqual);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        //NOTE - 화면이 로딩될 때 데이터들을 받아와줌.
        dispatch(phoneDataFetchAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    // if( loading ) return null;
    // if( error ) return <div>에러 발생 자세한건 로그 참조</div>;
    // if( !rows ) return <div>서버로부터 데이터 로딩 실패!</div>;
    
    return(
        <StyledTable>
            <TableHead>
                <Row key={`top_row_head`} top />
            </TableHead>
            <TableBody>
                { loading && null}
                {/* { !rows && <div>서버로부터 데이터 로딩 실패!</div>} */}
                {/* { error && <div>에러 발생 자세한건 로그 참조</div>} */}

                { rows && rows.map( (row,i) =>
                    <Row ref={ref} rowIndex={i} key={`row_body_${row.id}`} rowId={row.id}/>
                )}
            </TableBody>
        </StyledTable>
    );
});

export default React.memo(Tables);