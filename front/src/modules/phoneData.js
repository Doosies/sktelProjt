import produce from 'immer';
import { createPromiseThunk, handleAsyncActions } from '../lib/asyncUtils';
import * as postsAPI from '../utils/api';

const PHONE_DATA = 'phoneData/PHONE_DATA';
const PHONE_DATA_LOADING = 'phoneData/PHONE_DATA_LOADING';
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
                    id:'head', 
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
    },
    columnProperties : [
        {name:"기기명", width:"200px", colname:"model_name", textalign:"left"},
        {name:"모델명", width:"180px", colname:"machine_name", textalign:"left"},
        {name:"출고가", width:"70px", colname:"shipping_price", textalign:"right"},
        {name:"브랜드", width:"100px", colname:"maker", textalign:"center"},
        {name:"출시일", width:"100px", colname:"created", textalign:"center"},
        {name:"배터리 용량", width:"80px", colname:"battery", textalign:"right"},
        {name:"스크린 사이즈", width:"100px", colname:"screen_size", textalign:"right"},
        {name:"저장 용량", width:"100px", colname:"storage", textalign:"right"},
    ],
};
const phoneDataFetchAsync = createPromiseThunk(PHONE_DATA, postsAPI.getAllPhoneInfo);
// const phoneDataFetchAsync = () => async (dispatch) =>{
//     dispatch({type:PHONE_DATA_LOADING});
//     try{
//         const response = await postsAPI.getAllPhoneInfo();
//         dispatch({type:PHONE_DATA_SUCCESS,payload:response});
//     }catch(e){
//         dispatch({type:PHONE_DATA_ERROR,error:e});
//     }
// }
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
    // console.log(state,action);
    switch(action.type){
        case PHONE_DATA_LOADING:
        case PHONE_DATA_SUCCESS:
        case PHONE_DATA_ERROR:
            return handleAsyncActions(PHONE_DATA)(state,action);
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
                //렌더 배열에서 제거함.
                draft.data.rows = draft.data.rows.filter(row =>row.id !== action.id);
                // 제거를 누른 row가 새로 추가한 row가 아닐 경우
                // deleteList에 추가
                const idx = state.dataChangeList.dataAddList.findIndex( val => val === action.id);
                if(  idx === -1)
                    draft.dataChangeList.dataDeleteList.push(action.id);
                // 제거를 누른 row가 새로 추가한 row일 경우
                // addList에서 해당 배열 제거
                else
                    draft.dataChangeList.dataAddList.splice(idx,1);
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



export {phoneDataFetchAsync,
        phoneDataChange, phoneDataDelete, phoneDataAdd,
        };