import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import TabTrap from '../lib/TabTrap';
import Button from './Button';
import Portal from './Portal';
import {useSpring, animated, useTransition, Transition, config} from 'react-spring';




const Modal = ({title, children, onClickYes, OnClickNo, noCancel, isVisible = false}) =>{
    const wrapperAnimation = useSpring({
        from:{opacity:0},
        to:{opacity:1},
        opacity: 0,
    });
    
    const trasition = useTransition(isVisible,{
        config:{duration:300},
        from : {opacity:0, transform: "translateY(40px)"},
        enter : {opacity:1, transform: "translateY(0px)"},
        leave : {opacity:0, transform: "translateY(-40x)"},//, config:{mass:1, tension:500, friction:26, duration:100}},
    });

    return trasition( (style,isVisible) =>
            isVisible &&  
            <Portal elementId="modal-root">
                <TabTrap>
                    <ModalWrapper >
                        <ModalBox style={style}>
                            <Title> {title} </Title>
                            <InnerText>{children} </InnerText>
                            <InnerButtons>
                                <Button onClick={(e)=>{onClickYes(e)}} background_color="rgb(122, 186, 255)" small >확인</Button>
                                { !noCancel && <Button onClick={(e)=>{OnClickNo(e)}} background_color="rgb(255, 120, 135)" small >취소</Button>}
                            </InnerButtons>
                        </ModalBox>
                    </ModalWrapper>
                </TabTrap>
            </Portal>
    );
}
export default Modal



const ModalWrapper = styled(animated.div)`
    position:fixed;
    left:0;right:0;
    top:0;bottom:0;
    z-index:1000;

    background-color: rgba(0, 0, 0, 0.6);
    /* background-color: */

    display:flex;
    justify-content:center;
    align-items:center;

`;

const ModalBox = styled(animated.div)`
    position:relative;
    padding-top:20px;
    padding-bottom:20px;
    padding-left:20px;
    padding-right:20px;
    width:400px;
    /* height:200px; */
    background-color:white;
    border-radius:10px;
`;

const Title = styled.div`
    font-size:30px;
    font-weight:bold;
`;
const InnerText =styled.div`
    padding-top:20px;
    padding-left:20px;
    padding-bottom:40px;
`;
const InnerButtons = styled.div`
    position:absolute;
    right:0;
    bottom:0;
    padding-top:20px;
    padding-right:20px;
    padding-bottom:20px;
    display:flex;
`;