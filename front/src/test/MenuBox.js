import { useContext, useEffect, useRef } from "react"
import {MenuControllerContext} from "./menu"

const MenuBox = () =>{
    const {toggleState, isOpen, MenuExit, isVisible} = useContext(MenuControllerContext);
    const MenuEntrance = useRef();
    const menuitemms = [
        'Hello, NULI',
        'HELLO, Javascript',
        'Hello, React',
    ]

    useEffect(()=>{
        if(isOpen){
            MenuEntrance.current.focus();
        } else{
            MenuExit.current.focus();
        }
    },[MenuExit, isOpen]);

    return(
        <div id="menu-wrapper" className={`global-menu is Open ${isVisible}`}>
            <nav aria-label="콘텐츠 메뉴">
                <ul>
                    {menuitemms.map((el,idx)=>{
                        if( idx === 0){
                            return <li key={idx}><a href="#" ref={MenuEntrance}>{el}</a></li>
                        }
                        return <li key={idx}><a href="#">{el}</a></li>//7-4. ref가 없는 나머지도 리턴합니다.

                    })}
                </ul>
            </nav>
            <button aria-label={'닫기'} onClick={toggleState} id="btnCloseMenu"><span className="material-icons">close</span></button>
        </div>
    );
}

export default MenuBox;