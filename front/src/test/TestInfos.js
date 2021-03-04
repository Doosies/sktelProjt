import React from 'react';
import { getPhoneInfos, usePhoneInfoDispatch, usePhoneInfoState } from "./InfoContext";

function TestInfos(){
    const state = usePhoneInfoState();
    const dispatch = usePhoneInfoDispatch();

    const {data, loading, error} = state.phn_info;
    const fetchData = () =>{
        getPhoneInfos(dispatch);
        console.log(state);
    }

    if(loading) return <div>로딩중!</div>;
    if(error) return <div>에러방생!</div>;
    if(!data) return <button onClick={fetchData}>데이터 불러오기</button>;


    return(
        <div>
            {data.map(val=><div key={val.id}>{val.model_name}</div>)}

        </div>
    );
}

export default TestInfos;