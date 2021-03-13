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
const PHONE_DATA_UPDATE_LIST_ROW_INSERT = 'phoneData/PHONE_DATA_UPDATE_LIST_ROW_INSERT';
const PHONE_DATA_UPDATE_LIST_ROW_DELETE = 'phoneData/PHONE_DATA_UPDATE_LIST_ROW_DELETE';
const PHONE_DATA_UPDATE_LIST_COLUMN_INSERT = 'phoneData/PHONE_DATA_UPDATE_LIST_COLUMN_INSERT';
const PHONE_DATA_UPDATE_LIST_COLUMN_DELETE = 'phoneData/PHONE_DATA_UPDATE_LIST_COLUMN_DELETE';
const PHONE_DATA_UPDATE_LIST_COLUMN_CHANGE = 'phoneData/PHONE_DATA_UPDATE_LIST_COLUMN_CHANGE';

const dataInitRow = {
    id:'', 
    model_name:'', 
    machine_name:'', 
    shipping_price:'',
    maker:'',
    created:'', 
    battery:'', 
    screen_size:'',
    storage:'',
};
const dataInit = {
    lastId:'',
    rows:[
        dataInitRow,
    ],
}

const initialState = {
    state:{
        loading:false,
        error:false,
    },
    data:dataInit,
    firstData:dataInit,
    dataChangeList:{
        dataAddList:[],
        dataDeleteList:[],
        dataUpdateList:[],
    },
};



// 처음 데이터 받아오는 promisethunk
const phoneDataFetchAsync = createPromiseThunk(PHONE_DATA, postsAPI.getAllPhoneInfo);
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

const phoneDataUpdateList = ({
    RowInsert:(id) => ({
        type:PHONE_DATA_UPDATE_LIST_ROW_INSERT,
        id: id,
    }),
    RowDelete:(id) => ({
        type:PHONE_DATA_UPDATE_LIST_ROW_DELETE,
        id: id,
    }),
    ColumnInsert:(id, colName) => ({
        type:PHONE_DATA_UPDATE_LIST_COLUMN_INSERT,
        id: id,
        colName: colName,
    }),
    ColumnDelete:(id, colName) => ({
        type:PHONE_DATA_UPDATE_LIST_COLUMN_DELETE,
        id: id,
        colName: colName,
    }),
    ColumnChange:(id, colName) => ({
        type:PHONE_DATA_UPDATE_LIST_COLUMN_CHANGE,
        id: id,
        colName: colName,
    }),
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
                let init = {...dataInitRow}

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
                    draft.dataChangeList.dataAddList.slice(idx,1);
            });
        case PHONE_DATA_CHANGE:
            return produce(state, draft=>{
                const row = draft.data.rows.find( row => row.id === action.id);
                // row[action.colName] = action.colName === 'shipping_price' ? 
                //                         inputNumberFormat(action.value) : action.value;
                row[action.colName] = action.value;
            });
        case PHONE_DATA_UPDATE_LIST_ROW_INSERT:
            return produce(state, draft =>{
                const init = dataInit.rows;
                draft.dataChangeList.dataUpdateList.push();
            });
        case PHONE_DATA_UPDATE_LIST_ROW_DELETE:
            return{};
        case PHONE_DATA_UPDATE_LIST_COLUMN_INSERT:
            return{};
        case PHONE_DATA_UPDATE_LIST_COLUMN_DELETE:
            return{};
        case PHONE_DATA_UPDATE_LIST_COLUMN_CHANGE:
            return{};
        default:
            return state;
    }
}




export {phoneDataFetchAsync,
        phoneDataChange, phoneDataDelete, phoneDataAdd,
        phoneDataUpdateList,
        };