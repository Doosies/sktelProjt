import { useState } from "react";

export function useModal(){
    const [modalState, setModalState] = useState({
        isVisible:false,
        modalTitle:"",
        modalText:"",
    });

    const showModal = (title, text) =>{
        setModalState({
            isVisible:true,
            modalTitle:title,
            modalText:text,
        })
    };

    const hideModal = () =>{
        setModalState({
            ...modalState,
            isVisible:false,
        })
    }

    return [modalState, showModal, hideModal];
}