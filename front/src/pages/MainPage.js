import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import {Setting} from './pages';

function MainPage(){
    return(
        <div>
            Here is index page !<br/>
            <Link to="/setting">셋팅페이지로 이동</Link>
        </div>
    );
}
export default MainPage

//master commit