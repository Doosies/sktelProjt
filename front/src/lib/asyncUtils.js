
export const createPromiseThunk = (type, promiseCreator) =>{
    const [LOADING, SUCCESS, ERROR] = [`${type}_LOADING`, `${type}_SUCCESS`, `${type}_ERROR`];

    return param => async dispatch =>{
        //요청 시작
        dispatch({type:LOADING, param});
        try{
            // console.log(promiseCreator);
            const payload = await promiseCreator(param);
            dispatch({type:SUCCESS, payload});
            // console.log("data=>",payload);
            // console.log(SUCCESS);
            // console.log("payload",payload);
        }catch(e){
            dispatch({type:ERROR, error:e, param});
        }
    }
}


const reducerUtils = {
    // initial:(initialData = null) =>({
    //     state:{
    //         loading:false,
    //         error:false,
    //     },
    //     data:[],
    // }),
    loading:(prevstate=[]) => ({
        state:{
            loading:true,
            error:false,
        },
        data:prevstate,
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
                return{
                    ...state,
                    state:reducerUtils.success().state,
                    data:reducerUtils.success(action.payload).data,
                };
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