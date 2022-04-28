import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import produce from 'immer';

const initialPhoneInfoState =  {
    lastId:null,
    readPhoneInfoData : {
        loading:false,
        data:[{
            id:'', 
            model_name:'', 
            machine_name:'', 
            shipping_price:'',
            maker:'',
            created:'', 
            battery:'', 
            screen_size:'',
            storage:'',
        }],
        error:null,
    },
}

const loadingState = {
    loading:true,
    data:[],
    error:null
}
const success = data =>({
    loading: false,
    data,
    error : null,
});
const error = err =>({
    loading: false,
    data:[],
    error : err,
});


function PhoneInfoReducer(state, action){
    console.log(state);
    switch(action.type){
        case 'GET_PHN_INFO':
            // return produce(state, draft=>{
            //     dfaft.readPhoneInfoData.
            // })
            return{
                ...state,
                readPhoneInfoData:loadingState,
            };
        case 'GET_PHN_INFO_SUCCESS':
            return{
                ...state,
                lastId:action.lastId,
                readPhoneInfoData:success(action.data),
            };
        case 'GET_PHN_INFO_ERROR':
            return{
                ...state,
                readPhoneInfoData:error(action.error),
            };
        case 'DELETE_INFO':
            return produce(state, draft=>{
                const rows = draft.readPhoneInfoData.data;
                const idx = rows.findIndex( row => row.id === action.id);
                rows.splice(idx,1);
            });
        case 'ADD_INFO':
            return produce(state, draft=>{
                draft.lastId ++;
                draft.readPhoneInfoData.data.push({id:state.lastId+1});
            });
        case 'CHANGE_INFO':
            return produce(state, draft=>{
                const row = draft.readPhoneInfoData.data.find( row => row.id ===action.id);
                row[action.colName] = action.value;
            });
            // }
        
        // case 'ADD_DELETE_LIST':
        //     return{
        //         deleteList: state.deleteList.concat(action.id)
        //     };
        default:
            throw new Error(`알수없는 action ${action.type}`);
    }
}

const StateContext = createContext(null);

//export
function PhoneInfoProvider({children}){
    const [state, dispatch] = useReducer(PhoneInfoReducer, initialPhoneInfoState);
    return(
        <StateContext.Provider value={{state, dispatch}}>
                {children}
        </StateContext.Provider>
    );
    
}

function usePhoneInfoContext(){
    const context = useContext(StateContext);
    if( !context ) throw new Error('usePhoneInfoContext provider 확인바람');
    return context;
}

async function getPhoneInfoData(dispatch){
    dispatch({type:'GET_PHN_INFO'});
    try{
        const res = await axios.get('api/phoneinfo');
        console.log(res);
        const lastId = res.data[res.data.length-1].id;
        dispatch({type:'GET_PHN_INFO_SUCCESS', data:res.data, lastId:lastId});
    }catch(e){
        dispatch({type:'GET_PHN_INFO_ERROR', error:e});
    }
}

function addPhoneInfo(dispatch){
    dispatch({type:'ADD_INFO'});
}

export {PhoneInfoProvider,usePhoneInfoContext, getPhoneInfoData, addPhoneInfo};