import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk';
import { createGlobalStyle } from 'styled-components';

const store = createStore(rootReducer, composeWithDevTools(
  // applyMiddleware(ReduxThunk,logger)
  applyMiddleware(ReduxThunk)
));


const GlobalStyle = createGlobalStyle`
    html, body{
        height:100%;
        width:100%;
        

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
    #root, .App{
        ${'' /* @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap'); */}
        font-family: 'Nanum Gothic', sans-serif;
        height:100%;
        width:100%;
        border:0;
        margin:0;

    }
`;




ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
  </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


