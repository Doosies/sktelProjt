import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styled, { css } from 'styled-components';

const StyledTables = styled.div`

`;
const Table = styled.div`
`;
const Row = styled.div`
    text-align:center;
    display:flex;
`;

const Column = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;

    width: 100px;
    ${props=>css` 
        width: ${props.width}; 
    `}

    ${({ top }) => top && 
        css ` height:50px; 
    `}
`;
function Tables(){
    const [phoneInfo,setPhoneInfo] = useState([]);
    // const [rowNum,setRowNum] = useState('');

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const res = await axios.get('/api/phoneinfo');
                setPhoneInfo(res.data);
                // console.log(res.data);
            }catch(e){
                console.log(e);
            }
        };
        fetchData();

    },[]);

    const columnProperties = [
        {name:"기기명", width:"200px", valname:"model_name"},
        {name:"출고가", width:"", valname:"machine_name"},
        {name:"브랜드", width:"", valname:"maker"},
        {name:"출시일", width:"", valname:"created"},
        {name:"배터리 용량", width:"", valname:"battery"},
        {name:"스크린 사이즈", width:"", valname:"screen_size"},
        {name:"저장 용량", width:"", valname:"storage"},
    ];

    return(
        <StyledTables>
            <Table>
                {/* 테이블 상단 */}
                <Row>
                {columnProperties.map(property=>
                    <Column width={property.width}>{property.name}</Column>
                )}
                </Row>
                {/* 테이블 하단 */}
                {phoneInfo === '' ? '데이터 로딩중...' : phoneInfo.map(row=>
                    <Row key={row.id}>
                        <Column width="200px">{row.model_name}</Column>
                        <Column>{row.machine_name}</Column>
                        <Column>{row.maker}</Column>
                        <Column>{row.created}</Column>
                        <Column>{row.battery}</Column>
                        <Column>{row.screen_size}</Column>
                        <Column>{row.storage}</Column>
                    </Row>
                )}
            </Table>
        </StyledTables>
    );
}
export default Tables