import axios from 'axios';
import { useReducer, createContext, useContext } from 'react';


const initialState={
    phn_info:{
        loading:false,
        data:null,
        error:null
    }
}

const loadingState = {
    loading:true,
    data:null,
    error:null
}

const success = data=>({
    loading:false,
    data,
    error:null
});

const error = error=>({
    loading:false,
    data:null,
    error:error
});

function phoneInfoReducer(state, action) {
  switch (action.type) {
    case 'GET_PHN_INFO':
      return {
          ...state,
          phn_info: loadingState
      };
    case 'GET_PHN_INFO_SUCCESS':
      return {
          ...state,
          phn_info: success(action.data)
      };
    case 'GET_PHN_INFO_ERROR':
      return {
        ...state,
        phn_info: error(action.error)
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const PhoneInfoStateContext = createContext(null);
const PhoneInfoDispatchContext = createContext(null);

export function PhoneInfoProvider({children}){
    const [state, dispatch] = useReducer(phoneInfoReducer, initialState);
    return(
        <PhoneInfoStateContext.Provider value={state}>
            <PhoneInfoDispatchContext.Provider value={dispatch}>
                {children}
            </PhoneInfoDispatchContext.Provider>
        </PhoneInfoStateContext.Provider>
    );
}

//state 조회 간단히
export function usePhoneInfoState(){
    const state = useContext(PhoneInfoStateContext);
    if( !state )
        throw new Error(`PhoneInfoProvider를 찾을 수 없습니다.`);
    return state;
}

export function usePhoneInfoDispatch(){
    const dispatch = useContext(PhoneInfoDispatchContext);
    if( !dispatch )
        throw new Error('PhoneInfoDispatch를 찾을 수 없습니다');
    return dispatch;
}

export async function getPhoneInfos(dispatch){
    dispatch({type:'GET_PHN_INFO'});
    try{
        const res = await axios.get('api/phoneinfo');
        dispatch({type:'GET_PHN_INFO_SUCCESS', data:res.data});
    }catch(e){
        dispatch({type: 'GET_PHN_INFO_ERROR', error:e});
    }
}