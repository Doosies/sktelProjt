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

// const columnProperties = [
//     {name:"기기명", width:"200px", colname:"model_name", textalign:"left"},
//     {name:"모델명", width:"180px", colname:"machine_name", textalign:"left"},
//     {name:"출고가", width:"70px", colname:"shipping_price", textalign:"right"},
//     {name:"브랜드", width:"100px", colname:"maker", textalign:"center"},
//     {name:"출시일", width:"100px", colname:"created", textalign:"center"},
//     {name:"배터리 용량", width:"80px", colname:"battery", textalign:"right"},
//     {name:"스크린 사이즈", width:"100px", colname:"screen_size", textalign:"right"},
//     {name:"저장 용량", width:"100px", colname:"storage", textalign:"right"},
// ];
function Row({top, id}){
    const row = useSelector( state=> state.phoneData.data.rows.find(row=> row.id === id));
    const colProps = useSelector( state => state.phoneData.columnProperties);

    const dispatch = useDispatch();

    const handleDeleteButton = (id) =>{
        // 제거 누른 id는 data.rows 에서 제거함.
        // 그리고 dataAddList 배열에 겹치는 값이 없을 경우에만 
        // data.changeDatalist.dataDeleteList에 추가함
        dispatch(phoneDataDelete(id));
    }
    // console.log("row render");


    return(
        <StyledRow>
            <DeleteButton onClick={()=>handleDeleteButton(id)} top={top}>
                삭제
            </DeleteButton>

            {colProps.map(prop => 
            <Column key={`col_${id}_${prop.colname}`} width={prop.width} textalign={top ? 'center' : prop.textalign} top={top}>
                {top && /* 탑일경우 */
                    prop.name}
                {!top && /* 탑이 아닐경우 */
                    <Input key={`input_${id}_${prop.colname}`} textalign={prop.textalign} width={prop.width} colName={prop.colname} id={row.id} />
                }
            </Column>
            )}
        </StyledRow>
    );
}
export default React.memo(Row);