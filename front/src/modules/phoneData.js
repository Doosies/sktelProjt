import produce from 'immer';

const PHONE_DATA_LOADING = 'phoneData/PHONE_DATA';
const PHONE_DATA_SUCCESS = 'phoneData/PHONE_DATA_SUCCESS';
const PHONE_DATA_ERROR = 'phoneData/PHONE_DATA_ERROR';
const PHONE_DATA_CHANGE = 'phoneData/PHONE_DATA_CHANGE';
const PHONE_DATA_DELETE = 'phoneData/PHONE_DATA_DELETE';

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
// const increaseLastId = () =>({
//     type:INCREASE_LAST_ID,
// });

const phoneDataChange = (id, colName, value) =>({
    type:PHONE_DATA_CHANGE,
    id: id,
    colName:colName,
    value: value,
});
const phoneDataDelete = (id) =>({
    type:PHONE_DATA_DELETE,
    id: id,
});



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
        // case INCREASE_LAST_ID:
        //     return{
        //         ...state,
        //         lastId: state.lastId+1,
        //     }
        case PHONE_DATA_CHANGE:
            return produce(state, draft=>{
                const row = draft.data.rows.find( row => row.id === action.id);
                row[action.colName] = action.value;
            });
            
        case PHONE_DATA_DELETE:
            return produce(state, draft=>{
                // const rows = draft.data.rows;
                // const idx = rows.findIndex( row => row.id === action.id);
                // rows.splice(idx,1);
                // console.log(draft.data.rows);
                draft.data.rows = draft.data.rows.filter(row =>row.id !== action.id);
            });
        default:
            return state;
    }
}

export {phoneDataLoading, phoneDataSuccess, phoneDataError, //increaseLastId,
        phoneDataChange, phoneDataDelete, 
        };