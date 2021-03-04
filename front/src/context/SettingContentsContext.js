import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';

const initial = {
    loading:false,
    data:null,
    error:null,
}
const initialPhoneInfoState =  {
    insertPhoneInfos : {
        loading:false,
        data:null,
        error:null,
    },
    readPhoneInfos : {
        loading:false,
        data:null,
        error:null,
    },
    updatePhoneInfos : {
        loading:false,
        data:null,
        error:null,
    },
    deletePhoneInfos : {
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

function SettingContentsReducer(state, action){
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
        default:
            throw new Error(`알수없는 action ${action.type}`);
    }
}

const SettingContentsStateContext = createContext(null);
const SettingContentsDispatchContext = createContext(null);

export function SettingContentsProvider({children}){
    const [state, dispatch] = useReducer(SettingContentsReducer, initialPhoneInfoState);
    return(
        <SettingContentsStateContext.Provider value={state}>
            <SettingContentsDispatchContext.Provider value={dispatch}>
                {children}
            </SettingContentsDispatchContext.Provider>
        </SettingContentsStateContext.Provider>
    );
    
}

export function useSettingsContentsState(){
    const state = useContext(SettingContentsStateContext);
    if( !state ) throw new Error('provider 확인바람');
    return state;
}

export function useSettingsContentsDispatch(){
    const dispatch = useContext(SettingContentsDispatchContext);
    if( !dispatch ) throw new Error('provider 확인바람');
    return dispatch;
}

export async function getPhoneInfos(dispatch){
    dispatch({type:'GET_PHN_INFO'});
    try{
        const res = await axios.get('api/phoneinfo');
        dispatch({type:'GET_PHN_INFO_SUCCESS', data:res.data});
    }catch(e){
        dispatch({type:'GET_PHN_INFO_ERROR', error:e});
    }
}