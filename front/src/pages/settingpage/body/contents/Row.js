import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Button from '../../../../components/Button';
import { phoneDataDelete } from '../../../../modules/phoneData';
import Column from './Column';
import Input from './Input';

const StyledRow = styled.div`
    text-align:center;
    display:flex;
    align-items:center;
`;

const StyledColumn = styled.div`
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


const DeleteButton = styled(Button)`
    background-color: #ff7787;
    margin-right:5px;
    color:white;
    width:40px;
    
    ${({top}) => top && css`
        background-color:white;
        color:white;
        width:40px;
    `}
`;
const colProps = [
    {name:"기기명", width:"200px", colname:"model_name", textalign:"left"},
    {name:"모델명", width:"180px", colname:"machine_name", textalign:"left"},
    {name:"출고가", width:"70px", colname:"shipping_price", textalign:"right"},
    {name:"브랜드", width:"100px", colname:"maker", textalign:"center"},
    {name:"출시일", width:"100px", colname:"created", textalign:"center"},
    {name:"배터리 용량", width:"80px", colname:"battery", textalign:"right"},
    {name:"스크린 사이즈", width:"100px", colname:"screen_size", textalign:"right"},
    {name:"저장 용량", width:"100px", colname:"storage", textalign:"right"},
];
const prop = colProps[0];
const prop1 = colProps[1];
function Row({top, row}){
    console.log("row 렌더");
    // const colProps = useSelector( state => state.phoneData.columnProperties);
    // const dispatch = useDispatch();
    const handleDeleteButton = (id) =>{
        // 제거 누른 id는 data.rows 에서 제거함.
        // 그리고 dataAddList 배열에 겹치는 값이 없을 경우에만 
        // data.changeDatalist.dataDeleteList에 추가함
        // dispatch(phoneDataDelete(id));
    }

    if(top) return(
        <StyledRow>
            <DeleteButton top/>
            {colProps.map(prop => 
                <Column key={`col_top${prop.colname}`} prop={prop} top>
                        {prop.name}
                </Column>
            )}
        </StyledRow>
    );

    return(
        <StyledRow>
            <DeleteButton onClick={()=>handleDeleteButton(row.id)}> 삭제 </DeleteButton>
            {/* {colProps.map(prop =>  */}
                <Column key={`col_${row.id}_${prop.colname}`} prop={prop} top>
                    <Input prop={prop} id={row.id} />
                </Column>
                <Column key={`col_${row.id}_${prop1.colname}`} prop={prop1} top>
                    <Input prop={prop1} id={row.id} />
                </Column>
            {/* )} */}
        </StyledRow>
    );
}
export default React.memo(Row);