import produce from 'immer';

export const createPromiseThunk = (type, promiseCreator) =>{
    const [LOADING, SUCCESS, ERROR] = [`${type}_LOADING`, `${type}_SUCCESS`, `${type}_ERROR`];

    return param => async dispatch =>{
        //요청 시작
        dispatch({type:LOADING, param});
        try{
            // console.log(promiseCreator);
            const payload = await promiseCreator(param);
            dispatch({type:SUCCESS, payload});
        }catch(e){
            dispatch({type:ERROR, error:e, param});
        }
    }
}


const reducerUtils = {
    loading:(prevstate=[]) => ({
        state:{
            loading:true,
            error:false,
        },
    }),
    success:(payload)=> ({
        state:{
            loading:false,
            error:false,
        },
        data:payload,
    }),
    error:(error) => ({
        state:{
            loading:false,
            error:error,
        }
    }),
}

export const handleAsyncActions = (type) =>{
    const [LOADING, SUCCESS, ERROR] = [`${type}_LOADING`, `${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action)=>{
        switch(action.type){
            case LOADING:
                return{
                    ...state,
                    state:reducerUtils.loading().state,
                }
            case SUCCESS:
                return produce(state, draft=>{
                    draft.state = reducerUtils.success().state;
                    draft.firstData = reducerUtils.success(action.payload).data;
                    draft.data = reducerUtils.success(action.payload).data;

                    // ref 넣기위해 
                    // draft.data.rows.forEach(row => {
                    //     // refData는 배열.
                    //     draft.refData.push({ id:row.id });
                    // });
                });
            // case SUCCESS:
            //     return{
            //         ...state,
            //         state:reducerUtils.success().state,
            //         firstData:reducerUtils.success(action.payload).data,
            //         data:reducerUtils.success(action.payload).data,
            //     };
            case ERROR:
                return{
                    ...state,
                    state:reducerUtils.error(action.error).state,
                };
            default:
                return state;
        }
    }
}