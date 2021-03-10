import React, { useCallback } from 'react';
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

function Input({prop, id}){
    const  val  = useSelector( state => state.phoneData.data.rows
            [ state.phoneData.data.rows.findIndex( val=>val.id===id )]
            [ prop.colname ] 
    );

    const dispatch = useDispatch();
    // const dataChange = (val) => dispatch(phoneDataChange(id,prop.colname, val));

    const handleChange = useCallback( (e) => {
        const val = e.target.value;
        dispatch(phoneDataChange(id,prop.colname, val));
        },[dispatch, id, prop.colname]
    )

    return( 
        <StyledInput 
            textalign={prop.textalign} 
            width={prop.width} 
            value={val === null ? '': val}
            onChange={handleChange}
            // notRequired에 있는 배열에 포함되면 필수항목이 아님.
            required={notRequired.every(val => val !== prop.colname) ? true : false}
            // placeholder={}
        />
    );
}
export default React.memo(Input);

// export default (Input);