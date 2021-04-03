import React, { useRef } from 'react';
import styled from 'styled-components';
import TabTrap from '../lib/TabTrap';
import Button from './Button';
import Portal from './Portal';
import Fade from 'react-reveal/Fade';



const ModalWrapper = styled.div`
    position:fixed;
    left:0;right:0;
    top:0;bottom:0;
    z-index:1000;

    background-color: rgba(0, 0, 0, 0.6);

    display:flex;
    justify-content:center;
    align-items:center;

`;

const ModalBox = styled.div`
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

const Modal = ({title, text, children, onClickYes, OnClickNo, noCancel, isShow}) =>{
    // const ref = useRef(null);
    // ref.current.focus();
    // var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";


    return(
        <Portal elementId="modal-root">
            <TabTrap>
            {isShow &&
                <ModalWrapper>
                    <Fade bottom duration={400}>
                        <ModalBox >
                            <Title> {title} </Title>
                            <InnerText>{children} </InnerText>
                            <InnerButtons>
                                <Button onClick={(e)=>{onClickYes(e)}} background_color="rgb(122, 186, 255)" small >확인</Button>
                                { !noCancel && <Button onClick={(e)=>{OnClickNo(e)}} background_color="rgb(255, 120, 135)" small >취소</Button>}
                            </InnerButtons>
                        </ModalBox>
                    </Fade>
                </ModalWrapper>
            }
            </TabTrap>
        </Portal>
    );
}
export default Modal