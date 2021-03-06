import produce from 'immer';

const PHONE_DATA_LOADING = 'phoneData/PHONE_DATA';
const PHONE_DATA_SUCCESS = 'phoneData/PHONE_DATA_SUCCESS';
const PHONE_DATA_ERROR = 'phoneData/PHONE_DATA_ERROR';
const PHONE_DATA_CHANGE = 'phoneData/PHONE_DATA_CHANGE';
const INCREASE_LAST_ID = 'phoneData/INCREASE_LAST_ID';

const initialState = {
    state:{
        loading:false,
        error:false,
    },
    data:{
        lastId:'',
        rows:{
            id:'', 
            model_name:'', 
            machine_name:'', 
            shipping_price:'',
            maker:'',
            created:'', 
            battery:'', 
            screen_size:'',
            storage:'',
        }
    },
};

const phoneDataLoading = () =>({
    type:PHONE_DATA_LOADING,
});
const phoneDataSuccess = (data) =>({
    type:PHONE_DATA_SUCCESS,
    data:data
});
const phoneDataError = (error) =>({
    type:PHONE_DATA_ERROR,
    error:error,
});
const phoneDataChange = (id, colName, value) =>({
    type:PHONE_DATA_CHANGE,
    id: id,
    colName:colName,
    value: value,
});
const increaseLastId = () =>({
    type:INCREASE_LAST_ID,
});


export default function phoneData(state = initialState, action){
    console.log(action);
    switch(action.type){
        case PHONE_DATA_LOADING:
            return{
                ...state,
                state:{
                    loading:true,
                    error:false,
                },
                data:[],
            };
        case PHONE_DATA_SUCCESS:
            return{
                ...state,
                state:{
                    loading:false,
                    error:false,
                },
                data:action.data,
            };
        case PHONE_DATA_ERROR:
            return{
                ...state,
                state:{
                    loading:false,
                    error:action.error,
                },
                
                // data:[],
            };
        case PHONE_DATA_CHANGE:
            return produce(state, draft=>{
                const row = draft.data.rows.find( row => row.id === action.id);
                row[action.colName] = action.value;
            });
        case INCREASE_LAST_ID:
            return{
                ...state,
                lastId: state.lastId+1,
            }
        default:
            return state;
    }
}

export {phoneDataLoading, phoneDataSuccess, phoneDataError, phoneDataChange, increaseLastId};