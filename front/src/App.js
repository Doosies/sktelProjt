import React, {} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// import axios from 'axios';
import {Main, Setting} from './pages/pages';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from './Footer';
import Test from './test/Test';
import { createStore } from 'redux';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(rootReducer, composeWithDevTools());

const StyledApp = styled.div`
`;

const GlobalStyle = createGlobalStyle`
    body{
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
        font-family: 'Nanum Gothic', sans-serif;
        height:100vh;
        ${'' /* width:100%; */}
        border:0;
        margin:0;

        @media (min-width: 1920px) {
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
        }
        
    }
`;

function App(){

    return(
        <Provider store={store}>
            <StyledApp>
                <GlobalStyle/>
                <BrowserRouter>
                    <Route path="/" component={Main} exact/>
                    <Route path="/setting" component = {Setting}/>
                    <Route path="/test" component = {Test}/>
                </BrowserRouter>
                <Footer/>
            </StyledApp>
        </Provider>
    );
}
export default App