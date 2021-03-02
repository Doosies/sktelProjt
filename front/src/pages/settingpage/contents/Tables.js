import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const StyledTables = styled.div`

`;

function Tables(){
    // const [data,setData] = useState(0);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const res = await axios.get('/api/test');
                // setData(res);
                alert(JSON.stringify(res));
            }catch(e){
                // console.log(e);
            }
        };
        fetchData();

    },[]);

    return(
        <StyledTables>
        </StyledTables>
    );
}
export default Tables