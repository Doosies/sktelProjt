import React, {} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// import axios from 'axios';
import {Main, Setting} from './pages/pages';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from './Footer';
import Test from './test/Test';

const StyledApp = styled.div`
`;

const GlobalStyle = createGlobalStyle`
    html, body, #root, .App{
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
        font-family: 'Nanum Gothic', sans-serif;
        height:100vh;
        width:100vw;
        
        border:0;
        margin:0;

        ${'' /* overflow-x:auto; */}

        ${'' /* @media (min-width: 1920px) {
            width:100%;
        }
        @media (min-width: 1680px) and (max-width:1919px){
            width:1680px;
        }
        @media (min-width: 1366px) and (max-width:1669px){
            width:1366px;
        }
        @media (min-width: 1280px) and (max-width:1365px){
            width:1280px;
        }
        @media (min-width: 1025px) and (max-width: 1279px) {
            width:1025px;
        } */}
        
    }
`;

function App(){

    return(
        <>
        <GlobalStyle/>
        <BrowserRouter>
            <Route path="/" component={Main} exact/>
            <Route path="/setting" component = {Setting}/>
            <Route path="/test" component = {Test}/>
        </BrowserRouter>
        </>
    );
}
export default App