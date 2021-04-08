import {useTransition, animated, config} from 'react-spring'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { current } from 'immer';
import _default from 'react-bootstrap/esm/CardColumns';

export default function Test(){
    const [input, setInput] = useState("입력");
    const id = useRef(5);
    const ref = useRef();
    const [items, setItems] = useState(
      [
        {id: "1", texts: "1"},
        {id: "2", texts: "2"},
        {id: "3", texts: "3"},
        {id: "4", texts: "4"},
      ]
    );

    const transitions = useTransition(items, {
      from: { opacity:0, transform: 'translate3d(0,-40px,0)' },
      enter: { opacity:1, transform: 'translate3d(0,0,0)' },
      leave: { opacity:0, color: 'red', },
      });
    const handleClick = () =>{
      setItems(items.concat({
        id: id,
        texts: input,
      }));
      id.current += 1;
      ref.current.focus();
      setInput('');
    }
    const handleDelete = () =>{
      setItems(items.splice(1));
    }

    return (
      <div>
      <button onClick={handleClick}> 추가 </button>
      <button onClick={handleDelete}> 제거 </button>
        <div>
          {transitions((styleeee,itemmm)=>{
            return itemmm && <animated.div style={styleeee} key={itemmm.id}>
                    {itemmm.texts}
                    </animated.div>
          })}
        </div>
        <input ref={ref} value={input} onChange={(e)=>{setInput(e.target.value)}}/>
      </div>
    );
}