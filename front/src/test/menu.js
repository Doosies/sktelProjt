import React, {createContext, useRef, useState} from 'react';

export const MenuControllerContext = createContext();

function MenuController(){
    const [isOpen, setOpen] = useState(null);
    const [isVisible, setVisible] = useState(()=>{
        return isOpen ? true : false;
    });

    const MenuExit = useRef();

    const toggleState = () =>{
        setOpen(!isOpen);
        setVisible(!isOpen);
    }

    return(
        <MenuControllerContext.Provider value={{toggleState, isOpen, MenuExit, isVisible}}>
            <button aria-label="메뉴보기" ref={MenuExit} onClick={toggleState} aria-haspopup={!isOpen} id="btnOpenMenu">
                <span className="material-icons md auto">menu</span>
            </button>
            {/* <Menubox></Menubox> */}
        </MenuControllerContext.Provider>
    );
}
export default MenuController 