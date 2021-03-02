import React, {} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// import axios from 'axios';
import {Main, Setting} from './pages/pages';
import styled from 'styled-components';

const StyledApp = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
    font-family: 'Nanum Gothic', sans-serif;
`;

function App(){

    return(
        <StyledApp>
            <BrowserRouter>
                <Route path="/" component={Main} exact/>
                <Route path="/setting" component = {Setting}/>
            </BrowserRouter>
        </StyledApp>
    );
}
export default App