import React, {useEffect} from 'react';
import styled, { css } from 'styled-components';
import Button from '../../../../components/Button';
import { usePhoneChange } from '../../../../context/PhoneChangeContext';
import { getPhoneInfos, usePhoneInfo } from '../../../../context/PhoneInfoContext';


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

// const BlinkArea = styled.div`
//     width:42px;
// `;

const DeleteButton = styled(Button)`
    background-color: #ff7787;
    margin-right:5px;
    color:white;
    width:40px;
    

    ${({noButton}) => noButton && css`
        background-color:white;
        color:white;
        width:40px;
    `}
`;


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

function Tables(){
    // const state = usePhoneInfoState();
    // const dispatch = usePhoneInfoDispatch();
    const [phoneState, phoneDispatch] = usePhoneInfo();
    const [changeState, changeDispatch] = usePhoneChange();
    const {data:phoneInfos, loading, error} = phoneState.readPhoneInfos;



    useEffect( ()=>{
        const fetchInfos = () =>{
            getPhoneInfos(phoneDispatch);
        }
        fetchInfos();
    //eslint-disable-next-line
    },[]);


    const handleClickDelete = (id) =>{
        // -1이면 배열안에 존재하지 않음
        // 존재하지 않으면 삭제 리스트에 추가함.
        // if( deleteList.indexOf(id) === -1)
        //     setDeleteList([...deleteList, id]);
    }
    console.log("렌더링됨");
    if(loading) return <div> 데이터를 로딩중 입니다.</div>;
    if( !phoneInfos ) return <div>데이터 로딩 실패</div>;
    if(error) return <div>에러 발생</div>;

    return(
        <StyledTable>
            {/* 상단 ROW(제목) */}
            <Row key="row_top">
                {columnProperties.map(property=>
                    <Column key={`col_top${property.valname}`} width={property.width} textalign="center" top>
                        {property.name}
                    </Column>
                )}
            </Row>
            {/* 하단 Row(내용) */}
            {phoneInfos.map(row =>
                <Row key={`row_${row.id}`}>
                    <DeleteButton onClick={()=>{ handleClickDelete(row.id); }}> {`삭제`} </DeleteButton>
                    {columnProperties.map(property=>
                        <Column key={`col_${row.id}_${property.valname}`} width={property.width} textalign={property.textalign}> 
                            {row[ property.valname ]} 
                        </Column>
                    )}
                </Row>
            )}
        </StyledTable>
    );
}
export default Tables