
import React, { useEffect } from 'react'
import { useState } from 'react';
import { select } from './testAPI';
import styled from 'styled-components';


export default function Test(){
  // const [items,setItems] = useState([
  //   {id:1, text:"1"},
  //   {id:2, text:"2"},
  //   {id:3, text:"3"},
  //   {id:4, text:"4"},
  // ]);
  // const springs = useSprings(
  //   items.length,
  //   items.map(item => ({
  //     opacity:1,color:"red",transform:"translateX(0px)", 
  //     from:{ opacity:0, color:"blue",transform:"translateX(40px)"},
  //   }))
  // );
  
  // const handleAdd = () =>{
  //   setItems(items.concat({...items, id:Math.random(1,1000000000),text:Math.random(999999999,9999999999999)}));
  // };
  // const handleDelete = (id) =>{
  //   setItems(items.filter(item => item.id !== id));
  // };
  const[datas, setDatas] = useState({
    data:[],
  })

  useEffect(()=>{
    async function test(){
      const res = await select();
      setDatas({...datas, data:res});
    }
    test();
  },[]);
  

  return (
    <div>
    <StyledMember>
        <StyledDiv >memberID</StyledDiv>
        <StyledDiv >memberName</StyledDiv>
        <StyledDiv >memberAddress</StyledDiv>
    </StyledMember>
    {datas.data &&
      datas.data.map((val,idx)=>
      <StyledMember>
        <StyledDiv key={idx}>{val.memberID}</StyledDiv>
        <StyledDiv key={idx}>{val.memberName}</StyledDiv>
        <StyledDiv key={idx}>{val.memberAddress}</StyledDiv>
      </StyledMember>
    )}
    {/* <button onClick={handleAdd}>추가</button>
      {springs.map( (props,i) =>
        <animated.div style={props} key={i}>
          <button onClick={()=>{handleDelete(items[i].id)}}>X</button>
          {items[i].text}
        </animated.div>
      )} */}
    </div>
  );
}

const StyledMember = styled.div`
  display:flex;
`
const StyledDiv = styled.div`
  width: 150px;
`

