import { animated } from '@react-spring/web';
import React, { useEffect } from 'react';

function Item({styles, children}){
    useEffect(()=>{
        console.log("생성");
    },[]);
    return(
        <animated.div style={styles} >
            <input value="test"/>
            {children}
        </animated.div>
    );
}

export default React.memo(Item);