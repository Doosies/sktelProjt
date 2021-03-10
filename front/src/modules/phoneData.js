import produce from 'immer';
import { getAllPhoneInfo } from '../utils/api';

const PHONE_DATA_LOADING = 'phoneData/PHONE_DATA';
const PHONE_DATA_SUCCESS = 'phoneData/PHONE_DATA_SUCCESS';
const PHONE_DATA_ERROR = 'phoneData/PHONE_DATA_ERROR';
////////////////////////////////////////////////////////
const PHONE_DATA_ADD = 'phoneData/PHONE_DATA_ADD';
const PHONE_DATA_DELETE = 'phoneData/PHONE_DATA_DELETE';
const PHONE_DATA_CHANGE = 'phoneData/PHONE_DATA_CHANGE';
////////////////////////////////////////////////////////



const initialState = {
    state:{
        loading:false,
        error:false,
    },
    data:{
        lastId:'',
        rows:[
                {
                    id:'', 
                    model_name:'', 
                    machine_name:'', 
                    shipping_price:'',
                    maker:'',
                    created:'', 
                    battery:'', 
                    screen_size:'',
                    storage:'',
                },
        ],
    },
    dataChangeList:{
        dataAddList:[],
        dataDeleteList:[],
        dataUpdateList:[
            {
                colId:'',
                row:[
                    {
                        colName:'',
                        colValue:'',
                    }
                ]
            },
        ]
    }
};

////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////
const phoneDataAdd = () =>({
    type:PHONE_DATA_ADD,
});
const phoneDataDelete = (id) =>({
    type:PHONE_DATA_DELETE,
    id: id,
});
const phoneDataChange = (id, colName, value) =>({
    type:PHONE_DATA_CHANGE,
    id: id,
    colName:colName,
    value: value,
});
////////////////////////////////////////////////////////




export default function phoneData(state = initialState, action){
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
            };
        ////////////////////////////////////////////////////////
        case PHONE_DATA_ADD:
            return produce(state, draft=>{
                const init = [initialState.data.rows];

                draft.data.lastId ++;
                init.id = state.data.lastId+1;
                draft.data.rows.push(init);
                draft.dataChangeList.dataAddList.push(init.id);
            });
        case PHONE_DATA_DELETE:
            return produce(state, draft=>{
                draft.data.rows = draft.data.rows.filter(row =>row.id !== action.id);
            });
        case PHONE_DATA_CHANGE:
            return produce(state, draft=>{
                const row = draft.data.rows.find( row => row.id === action.id);
                row[action.colName] = action.value;
            });
        default:
            return state;
    }
}


const phoneDataFetchAsync = () => async (dispatch) =>{
    dispatch(phoneDataLoading());
    try{
        const response = await getAllPhoneInfo();
        dispatch(phoneDataSuccess(response));
    }catch(e){
        dispatch(phoneDataError(e));
    }
}

export {phoneDataLoading, phoneDataSuccess, phoneDataError, phoneDataFetchAsync,
        phoneDataChange, phoneDataDelete, phoneDataAdd,
        };