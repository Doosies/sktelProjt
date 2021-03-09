import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { phoneDataError, phoneDataLoading, phoneDataSuccess } from '../../../../modules/phoneData';
import { getAllPhoneInfo } from '../../../../utils/api';
import Row from './Row';

const StyledTable = styled.div`
    width:auto;
`;

function Tables(){
    console.log("테이블 렌더링");

    const {rows, error,loading} = useSelector( state =>({
        rows: state.phoneData.data.rows,
        loading:state.phoneData.state.loading,
        error:state.phoneData.state.error,
    }));

    const dispatch = useDispatch();
    const nowLoading = () => dispatch(phoneDataLoading());
    const nowSuccess = (data) =>dispatch(phoneDataSuccess(data));
    const nowError = (error) => dispatch(phoneDataError(error));
    

    
    useEffect(() =>{
        const fetchData = async()=>{
            nowLoading();
            try{
                const response = await getAllPhoneInfo();
                nowSuccess(response);
            }catch(e){
                nowError(e);
            }
        }
        fetchData();

    },[]);

    
    if(loading) return null;    
    if( !rows ) return <div>데이터 로딩 실패</div>;
    if(error) return <div>에러 발생</div>;

    return(
        <StyledTable>
            <Row key={`row_head`} top />
            {rows.map(row=>
               <Row key={`row_body_${row.id}`} id={row.id} /> 
            )}
        </StyledTable>
    );
}
export default React.memo(Tables);