import { useLayoutEffect, useRef, useState } from "react";

export function useHeight({ on = true /* no value means on */ } = {} ) {
    // 관찰할 div의 ref 
    const ref = useRef();
    // 해당 div의 height
    const [height, set] = useState(0);
    // height ref = 위의 height ref
    const heightRef = useRef(height);
    
    const [resizeObserver] = useState( () => 
        new ResizeObserver( packet =>{
            // ref가 div에 지정 돼 있고   && heightRef는 div의 offsetHeight
            if( ref.current && heightRef.current !== ref.current.offsetHeight){
                console.log(heightRef.current);
                heightRef.current = ref.current.offsetHeight;
                set(ref.current.offsetHeight);
            }
        })
    );
    // 화면이 렌더링 되기 이전에
    useLayoutEffect(()=>{
        // div의 ref가 지정되면
        if( on && ref.current){
            set(ref.current.offsetHeight);
            resizeObserver.observe(ref.current, {});
        }
        //객체가 삭제되면 관찰을 그만둠.
        return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[on, ref.current]);
    return [ref, height];
}