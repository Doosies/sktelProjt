import React, { forwardRef, useEffect, useLayoutEffect } from 'react';
import styled, {  } from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Row from './Row';
import { phoneDataFetchAsync } from '../../../../modules/phoneData';
import { useTransition } from '@react-spring/core';
import { animated } from '@react-spring/web';

const Tables = forwardRef((_,ref) => {
    // console.log("table");
    const { rows, error,loading} = useSelector( state =>({
        rows: state.phoneData.data.rows,
        loading:state.phoneData.state.loading,
        error:state.phoneData.state.error,
    }), shallowEqual);
    const dispatch = useDispatch();
    // console.log(rows.map((data, i) => ({...data, y: i * 40})));

    // const height = 40;
    // console.log(rows.map((data, i) => ({...data, y: i * 40})));
    // const transitions = useTransition(
    //     rows.map((data, i) => ({...data, y: i * 40})),
    //     row=>{console.log(row); return `row_body_${row.id}`}, 
    //     {
    //         from: {position:"absolute", opacity: 0},
    //         leave: {height:0, opacity: 0},
    //         enter: ({y}) => ({ y, opacity: 1}),
    //         update: ({y}) => ({ y }),
    //     }
    // );
    // console.log(transitions);
    
    
    useEffect(()=>{
        //NOTE - 화면이 로딩될 때 데이터들을 받아와줌.
        dispatch(phoneDataFetchAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    
    return(
        <StyledTable>
            <TableHead>
                <Row key={`top_row_head`} top />
            </TableHead>
            <TableBody>
                { loading && null}
                { !rows && <div>서버로부터 데이터 로딩 실패!</div>}
                { error && <div>에러 발생 자세한건 로그 참조</div>}

                { rows && rows.map( row =>
                    <Row ref={ref} key={`row_body_${row.id}`} rowId={row.id}/>
                )}

            </TableBody>
        </StyledTable>
    );
});

export default React.memo(Tables);


const StyledTable = styled(animated.div)`
    position:relative;
    width:100%;
    height:100%;
    overflow-y:auto;
`;

const TableHead = styled.div`
    display:table;
    position:sticky;
    top:0;
    background-color:hsl(0, 0%, 100%);
    border-bottom: solid 1px;
`;

const TableBody = styled.div`
`;