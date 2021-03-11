import React, { useCallback } from 'react'
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
// const columns = [
//     {name:"기기명", width:"200px", colname:"model_name", textalign:"left"},
//     {name:"모델명", width:"180px", colname:"machine_name", textalign:"left"},
//     {name:"출고가", width:"70px", colname:"shipping_price", textalign:"right"},
//     {name:"브랜드", width:"100px", colname:"maker", textalign:"center"},
//     {name:"출시일", width:"100px", colname:"created", textalign:"center"},
//     {name:"배터리 용량", width:"80px", colname:"battery", textalign:"right"},
//     {name:"스크린 사이즈", width:"100px", colname:"screen_size", textalign:"right"},
//     {name:"저장 용량", width:"100px", colname:"storage", textalign:"right"},
// ];

function Row({top, rowId}){
    console.log("ROW");
    const columns = useSelector( state => state.phoneData.columnProperties);
    const dispatch = useDispatch();


    const handleDeleteButton = useCallback( (id) => {
            // 제거 누른 id는 data.rows 에서 제거함.
            // 그리고 dataAddList 배열에 겹치는 값이 없을 경우에만 
            // data.changeDatalist.dataDeleteList에 추가함
            dispatch(phoneDataDelete(id));
        },[dispatch]);
    // const handleDeleteButton =  (id) => {
    //         // 제거 누른 id는 data.rows 에서 제거함.
    //         // 그리고 dataAddList 배열에 겹치는 값이 없을 경우에만 
    //         // data.changeDatalist.dataDeleteList에 추가함
    //         dispatch(phoneDataDelete(id));
    //     };

    // if(top) return(
    //     <StyledRow>
    //         <DeleteButton top/>
    //         {columns.map(column => 
    //             <Column key={`head_${column.colname}`}top>
    //                 {column.name}
    //             </Column>
    //         )}
    //     </StyledRow>
    // );
    // textalign, width, colname, id
    return( //React.useMemo(()=>
        <StyledRow>
            <DeleteButton onClick={()=>handleDeleteButton(rowId)}> 삭제 </DeleteButton>
            {columns.map((column, index)=>
                <Column key={`row_${rowId}_${column.name}`} width={column.width} textalign={column.textalign}>
                    <Input colIndex={index} id={rowId} column={column} />
                </Column>
            )}
        </StyledRow>
        //,[])
    );
}
export default React.memo(Row);