import { useReducer, useEffect } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const initialState={
    loading:false,
    data:null,
    error:null
}

function useAsync(callback, deps = [], skip = false){
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchInfos = async() =>{
        dispatch({type:'LOADING'});
        try{
            // const res = await axios.get('/api/phoneinfo');
            const res = await callback();
            dispatch({type:'SUCCESS',data:res});
        }catch(e){
            dispatch({type:'ERROR',error:e})
        }
    }
    
    useEffect(()=>{
        if(skip) return;
        fetchInfos();
        // eslint 설정을 다음 줄에서만 비활성화
        // eslint-disable-next-line
    },deps);
    
    return [state, fetchInfos];

}

export default useAsync