import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styled, { css } from 'styled-components';
import Button from '../../../../components/Button';

const StyledTable = styled.div`
    width:auto;
`;

const Row = styled.div`
    text-align:center;
    display:flex;
    align-items:center;
`;

const Column = styled.div`
    border-bottom: solid 1px;
    padding-top:10px;
    padding-bottom:10px;
    padding-left:5px;
    padding-right:5px;
    font-size:12px;
    height:20px;

    width: 100px;
    ${props=>css` 
        width: ${props.width}; 
        text-align:${props.textalign};
    `}

    /* 제일 상단에 있는 column일 경우 */
    ${({ top }) => top && 
        css `
            padding-top:15px;
            padding-bottom:15px;
            font-size:15px;
            font-weight:bold;
    `}
`;

const DeleteButton = styled.div`
    background-color: #ff7787;
    margin-left:10px;
`;
function Tables(){
    const [phoneInfo,setPhoneInfo] = useState([]);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const res = await axios.get('/api/phoneinfo');
                setPhoneInfo(res.data);
                console.log(res.data);
                // console.log(res.data);
            }catch(e){
                console.log(e);
            }
        };
        fetchData();
        console.log(window.innerWidth, document.body.clientHeight);
        console.log(window.innerHeight, document.body.clientWidth);

    },[]);

    const columnProperties = [
        {name:"기기명", width:"200px", valname:"model_name", textalign:"left"},
        {name:"모델명", width:"180px", valname:"machine_name", textalign:"left"},
        {name:"출고가", width:"90px", valname:"shipping_price", textalign:"right"},
        {name:"브랜드", width:"130px", valname:"maker", textalign:"center"},
        {name:"출시일", width:"130px", valname:"created", textalign:"center"},
        {name:"배터리 용량", width:"100px", valname:"battery", textalign:"right"},
        {name:"스크린 사이즈", width:"100px", valname:"screen_size", textalign:"right"},
        {name:"저장 용량", width:"100px", valname:"storage", textalign:"right"},
    ];

    return(
        <StyledTable>
            {/* 테이블 상단(헤드) */}
            <Row>
            {columnProperties.map(property=>
                <Column width={property.width} textalign="center" top>{property.name}</Column>
            )}
            </Row>

            {/* 테이블 하단 */}
            {phoneInfo === '' ? '데이터 로딩중...' : phoneInfo.map(row=>
                <Row>{
                    columnProperties.map(property=>
                        <Column width={property.width} textalign={property.textalign}>  
                            {row[property.valname]} 
                        </Column>
                    )
                }
                <DeleteButton>
                    <Button onClick={()=>{alert("데이터 제거")}} width="30px" height="20px" font_size="20px" font_weight="bold" color="white" border> - </Button>
                </DeleteButton>
                </Row>
            )}
        </StyledTable>
    );
}
export default Tables