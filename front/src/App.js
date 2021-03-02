import React, {} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// import axios from 'axios';
import {Main, Setting} from './pages/pages';
import styled from 'styled-components';
import Footer from './Footer';

const StyledApp = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
    font-family: 'Nanum Gothic', sans-serif;
    width:100%;
    height:100%;
    border:0;
    margin:0;
`;

function App(){

    return(
        <StyledApp>
            <BrowserRouter>
                <Route path="/" component={Main} exact/>
                <Route path="/setting" component = {Setting}/>
            </BrowserRouter>
            <Footer/>
        </StyledApp>
    );
}
export default App