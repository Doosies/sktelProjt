import React, {useCallback, useEffect} from 'react';
import styled, { css } from 'styled-components';
import Button from '../../../../components/Button';
import { useDispatch, useSelector } from "react-redux";
import { phoneDataError, phoneDataLoading, phoneDataSuccess } from '../../../../modules/phoneData';
import { getAllPhoneInfo } from '../../../../utils/api';
import Column from './Column';
import Input from './Input';

const columnProperties = [
    {name:"기기명", width:"200px", colname:"model_name", textalign:"left"},
    {name:"모델명", width:"180px", colname:"machine_name", textalign:"left"},
    {name:"출고가", width:"70px", colname:"shipping_price", textalign:"right"},
    {name:"브랜드", width:"100px", colname:"maker", textalign:"center"},
    {name:"출시일", width:"100px", colname:"created", textalign:"center"},
    {name:"배터리 용량", width:"80px", colname:"battery", textalign:"right"},
    {name:"스크린 사이즈", width:"100px", colname:"screen_size", textalign:"right"},
    {name:"저장 용량", width:"100px", colname:"storage", textalign:"right"},
];

const StyledTable = styled.div`
    width:auto;
`;

const Row = styled.div`
    text-align:center;
    display:flex;
    align-items:center;
`;

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




function Tables(){
    console.log("테이블 렌더링");

    const {lastId, rows, error,loading} = useSelector( state =>({
        lastId: state.phoneData.data.lastId,
        rows: state.phoneData.data.rows,
        loading:state.phoneData.state.loading,
        error:state.phoneData.state.error,
    }));

    const dispatch = useDispatch();
    const nowLoading = () => dispatch(phoneDataLoading());
    const nowSuccess = (data) =>dispatch(phoneDataSuccess(data));
    const nowError = (error) => dispatch(phoneDataError(error));
    // console.log("현재 스테이트->",state);
    
    // const getData = useCallback( 
    // },[nowError, nowLoading, nowSuccess]);

    
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
    if( !lastId ) return <div>데이터 로딩 실패</div>;
    if(error) return <div>에러 발생</div>;

    return(
        <StyledTable>
            {/* 상단 ROW(제목) */}
            <Row key="row_top">
                <DeleteButton noButton/>
                {columnProperties.map(property=>
                    <Column key={`col_top${property.colname}`} 
                            width={property.width} 
                            textalign="center" top
                    >
                        {property.name}
                    </Column>
                )}
            </Row>
            {/* 하단 Row(내용) */}
            {rows.map(row =>
                <Row key={`row_${row.id}`}>
                    <DeleteButton onClick={()=>{ }}> {`삭제`} </DeleteButton>
                    {columnProperties.map(property=>
                        <Column key={`col_${row.id}_${property.colname}`} 
                                width={property.width} 
                                textalign={property.textalign}
                        > 
                            <Input 
                                textalign={property.textalign} 
                                width={property.width} 
                                colName={property.colname} 
                                id={row.id}
                                // value={row[ property.colname ]} 
                            />
                        </Column>
                    )}
                </Row>
            )}
        </StyledTable>
    );
}
export default React.memo(Tables);