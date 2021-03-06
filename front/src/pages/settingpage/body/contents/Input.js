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


function Input({textalign, width, colName, id}){
    const { val } = useSelector( state =>({ 
        val: state.phoneData.data.rows
            [ state.phoneData.data.rows.findIndex( val=>val.id===id )]
            [ colName ] 
    }));
    // const rowId = rows.findIndex(val => val.id === id);
    // const value = rows[rowId][colName];

    const dispatch = useDispatch();
    const dataChange = (val) => dispatch(phoneDataChange(id,colName, val));

    const handleChange = (e) =>{
        dataChange(e.target.value);
    }

    // console.log("input렌더", id, colName, value);


    return( 
        <StyledInput 
            textalign={textalign} 
            width={width} 
            value={val === null ? '': val}
            onChange={handleChange}
        />
    );
}
export default React.memo(Input);