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
                init.id = draft.data.lastId;
                draft.data.rows.push(init);
                // 추가 리스트에 추가.
                draft.dataChangeList.dataAddList.push(init.id);
            });
        case PHONE_DATA_DELETE:
            return produce(state, draft=>{
                draft.data.rows = draft.data.rows.filter(row =>row.id !== action.id);
                // 제거를 누른 row가 새로 추가한 row가 아닐 경우
                if( state.dataChangeList.dataAddList.findIndex( val => val === action.id) === -1)
                    draft.dataChangeList.dataDeleteList.push(action.id);
                
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
    dispatch({type:PHONE_DATA_LOADING});
    try{
        const response = await getAllPhoneInfo();
        dispatch({type:PHONE_DATA_SUCCESS,data:response});
    }catch(e){
        dispatch({type:PHONE_DATA_ERROR,error:e});
    }
}

export {phoneDataFetchAsync,
        phoneDataChange, phoneDataDelete, phoneDataAdd,
        };