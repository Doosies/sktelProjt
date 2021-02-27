import React, {} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// import axios from 'axios';
import {Main, Setting} from './pages/pages';

function App(){

    return(
        <>
            <BrowserRouter>
                <Route path="/" component={Main} exact/>
                <Route path="/setting" component = {Setting} exact/>
            </BrowserRouter>
        </>
    );
}
export default App