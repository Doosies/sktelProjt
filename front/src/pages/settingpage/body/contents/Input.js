import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { phoneDataChange } from '../../../../modules/phoneData';


const StyledInput = styled.input`
    ${({ width, textalign })=>css`
        width:${width};
        text-align:${textalign};
    `}
`;
// 필수 입력 항목이 아닌것들
const notRequired = [
    "battery", "screen_size", "storage"
];

function Input({textalign, width, colName, id}){
    const  val  = useSelector( state => state.phoneData.data.rows
            [ state.phoneData.data.rows.findIndex( val=>val.id===id )]
            [ colName ] 
    );

    const dispatch = useDispatch();
    const dataChange = (val) => dispatch(phoneDataChange(id,colName, val));

    const handleChange = (e) =>{
        dataChange(e.target.value);
        console.log(e.target.value);
    }

    return( 
        <StyledInput 
            textalign={textalign} 
            width={width} 
            value={val === null ? '': val}
            onChange={handleChange}
            // notRequired에 있는 배열에 포함되면 필수항목이 아님.
            required={notRequired.every(val => val !== colName) ? true : false}
        />
    );
}
export default React.memo(Input);