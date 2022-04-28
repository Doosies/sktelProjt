import React, { forwardRef, useEffect } from 'react';
import styled, {  } from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Row from './Row';
import { phoneDataFetchAsync } from '../../../../modules/phoneData';
import { useSprings } from '@react-spring/core';

const Tables = forwardRef(({ inputMode },ref) => {
    // console.log("tableRender");
    const dispatch = useDispatch();
    const { rows, error,loading} = useSelector( state =>({
        rows: state.phoneData.data.rows,
        loading:state.phoneData.state.loading,
        error:state.phoneData.state.error,
    }), shallowEqual);

    let springs = useSprings(
        rows.length,
        rows.map(()=>({
            opacity:1,transform:"translateY(0px)", 
            from:{ opacity:0,transform:"translateY(-20px)"},
        })))


    useEffect(()=>{
        //NOTE - 화면이 로딩될 때 데이터들을 받아와줌.
        dispatch(phoneDataFetchAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    
    return(
        <StyledTable>
        {(loading || error) && 
            <BeforLoading isSuccessLoading={!!rows}>
                {loading && <>LOADING...</>}
                {error && <>ERROR!</>}
            </BeforLoading>
        }
            <TableHead>
                <Row key={`top_row_head`} top />
            </TableHead>
            <TableBody className="scrollTable">
                {springs.map( (style, i) =>
                    <Row ref={ref} key={`row_body_${rows[i].id}`} rowId={rows[i].id} rowIdx={i} rowStyle={style} inputMode={inputMode}/>
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

    padding-right:20px;
    /* margin-left:20px; */
`;

const TableHead = styled.div`
    width:100%;
    display:table;
    position:sticky;
    top:0;
    background-color: white;
    border-bottom: solid 1px;
    z-index:999;
`;

const TableBody = styled.div`
    width:100%;
    height:100%;
`;

const BeforLoading = styled.div`
    display:table;
    position:sticky;
    top:0;
    display:flex;
    width:100%;
    height:100%;
    justify-content: center;
    align-items: center;
    /* background-color:#f9f9f9; */
    overflow-y:hidden;
`;