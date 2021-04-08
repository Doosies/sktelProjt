import { config, useSpring, useTransition } from '@react-spring/core';
import { animated } from '@react-spring/web';
import React, { useState } from 'react'
import { useHeight } from './useHeight';

export default function Test(){
  const [show, setShow] = useState(false);
  const [showA, setShowA] = useState(false);

  const [heightRef, height] = useHeight();
  const slideInStyles = useSpring({
    config: {...config.stiff},
    from: {opacity:0, height:0},
    to: {
      opacity: showA ? 1 : 0,
      height: showA ? height : 0,
    }
  });
  
  // const fadeStyled = useSpring({
  //   config: {...config.stiff},
  //   from: { opacity: 0},
  //   to:{ opacity: showA ? 1 : 0}
  // });

    // arr.
    return (
      <div>
        <animated.div style = {{...slideInStyles, overflow:"hidden" }}>
          <div ref={heightRef}>
            이건 fade in and out 될거임.

          </div>
        </animated.div>
        <button onClick={()=>{ setShowA( val => !val)}}> toggle </button>
        <hr/>
      </div>
    );
}
