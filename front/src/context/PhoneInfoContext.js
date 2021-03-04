import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';

const initialPhoneInfoState =  {
    readPhoneInfos : {
        loading:false,
        data:null,
        error:null,
    },
}

const loadingState = {
    loading:true,
    data:null,
    error:null
}
const success = data =>({
    loading: false,
    data,
    error : null,
});
const error = err =>({
    loading: false,
    data:null,
    error : err,
});


function PhoneInfoReducer(state, action){
    switch(action.type){
        case 'GET_PHN_INFO':
            return{
                ...state,
                readPhoneInfos:loadingState,
            };
        case 'GET_PHN_INFO_SUCCESS':
            return{
                ...state,
                readPhoneInfos:success(action.data),
            };
        case 'GET_PHN_INFO_ERROR':
            return{
                ...state,
                readPhoneInfos:error(action.error),
            };
        // case 'ADD_DELETE_LIST':
        //     return{
        //         deleteList: state.deleteList.concat(action.id)
        //     };
        default:
            throw new Error(`알수없는 action ${action.type}`);
    }
}

const PhoneInfoStateContext = createContext(null);
const PhoneInfoDispatchContext = createContext(null);

//export
function PhoneInfoProvider({children}){
    const [state, dispatch] = useReducer(PhoneInfoReducer, initialPhoneInfoState);
    return(
        <PhoneInfoStateContext.Provider value={state}>
            <PhoneInfoDispatchContext.Provider value={dispatch}>
                {children}
            </PhoneInfoDispatchContext.Provider>
        </PhoneInfoStateContext.Provider>
    );
    
}

function usePhoneInfoState(){
    const state = useContext(PhoneInfoStateContext);
    if( !state ) throw new Error('provider 확인바람');
    return state;
}

function usePhoneInfoDispatch(){
    const dispatch = useContext(PhoneInfoDispatchContext);
    if( !dispatch ) throw new Error('provider 확인바람');
    return dispatch;
}

//export
function usePhoneInfo(){
    return [usePhoneInfoState(), usePhoneInfoDispatch()];
}
//export
async function getPhoneInfos(dispatch){
    dispatch({type:'GET_PHN_INFO'});
    try{
        const res = await axios.get('api/phoneinfo');
        dispatch({type:'GET_PHN_INFO_SUCCESS', data:res.data});
    }catch(e){
        dispatch({type:'GET_PHN_INFO_ERROR', error:e});
    }
}

export {PhoneInfoProvider, usePhoneInfo, getPhoneInfos};