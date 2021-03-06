import React, { forwardRef, useEffect } from 'react';
import styled, {  } from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Row from './Row';
import { phoneDataFetchAsync } from '../../../../modules/phoneData';
import { config, useSprings, useTransition } from '@react-spring/core';
import { animated } from '@react-spring/web';

const Tables = forwardRef((_,ref) => {
    const dispatch = useDispatch();
    const { rows, error,loading} = useSelector( state =>({
        rows: state.phoneData.data.rows,
        loading:state.phoneData.state.loading,
        error:state.phoneData.state.error,
    }), shallowEqual);

    const springs = useSprings(
        rows.length,
        rows.map(()=>({
            opacity:1,transform:"translateX(0px)", 
            from:{ opacity:0,transform:"translateX(40px)"},
        }))
    )

    

    useEffect(()=>{
        //NOTE - 화면이 로딩될 때 데이터들을 받아와줌.
        dispatch(phoneDataFetchAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    
    return(
        <StyledTable>
            <TableHead>
                {/* <Row key={`top_row_head`} top /> */}
            </TableHead>
            <TableBody>
                { loading && null}
                { !rows && <div>서버로부터 데이터 로딩 실패!</div>}
                { error && <div>에러 발생 자세한건 로그 참조</div>}
                {/* {rows.map( (row,idx) =>
                    <Row ref={ref} key={`row_body_${row.id}`} rowId={row.id}/>
                )} */}
                {springs.map( (style, i) =>
                        <Row ref={ref} key={`row_body_${rows[i].id}`} rowId={rows[i].id} rowStyle={style}/>
                )}
            </TableBody>
        </StyledTable>
    );
});

export default React.memo(Tables);


const StyledTable = styled.div`
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