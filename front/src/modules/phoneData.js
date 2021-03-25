import produce from 'immer';
import { createPromiseThunk, handleAsyncActions } from '../lib/asyncUtils';
import * as restAPI from '../utils/api';

const PHONE_DATA = 'phoneData/PHONE_DATA';
const PHONE_DATA_LOADING = 'phoneData/PHONE_DATA_LOADING';
const PHONE_DATA_SUCCESS = 'phoneData/PHONE_DATA_SUCCESS';
const PHONE_DATA_ERROR = 'phoneData/PHONE_DATA_ERROR';
////////////////////////////////////////////////////////
const PHONE_DATA_ADD = 'phoneData/PHONE_DATA_ADD';
const PHONE_DATA_DELETE = 'phoneData/PHONE_DATA_DELETE';
const PHONE_DATA_CHANGE = 'phoneData/PHONE_DATA_CHANGE';
////////////////////////////////////////////////////////
// const PHONE_DATA_UPDATE_LIST_INSERT = 'phoneData/PHONE_DATA_UPDATE_LIST_INSERT';
const PHONE_DATA_UPDATE_LIST_CHANGE = 'phoneData/PHONE_DATA_UPDATE_LIST_CHANGE';
const PHONE_DATA_UPDATE_LIST_DELETE = 'phoneData/PHONE_DATA_UPDATE_LIST_DELETE';

const dataInitRow = {
    id:null,
    model_name:null,
    machine_name:null,
    shipping_price:null,
    maker:null,
    created:null,
    battery:null,
    screen_size:null,
    storage:null,
};

const dataInit = {
    lastId:null,
    rows:[],
}

const initialState = {
    state:{
        loading:false,
        error:false,
    },
    data:dataInit,
    // refData:[],
    firstData:dataInit,
    dataChangeList:{
        dataAddList:[],
        dataDeleteList:[],
        dataUpdateList:[],
    },
};



// 처음 데이터 받아오는 promisethunk
const phoneDataFetchAsync = createPromiseThunk(PHONE_DATA, restAPI.getAllPhoneInfo);
////////////////////////////////////////////////////////
const phoneDataUpdate =({
    Add:()=>({
        type:PHONE_DATA_ADD,
    }),
    Delete:(id)=>({
        type:PHONE_DATA_DELETE,
        id: id,
    }),
    Change:(id, colName, value)=>({
        type:PHONE_DATA_CHANGE,
        id: id,
        colName:colName,
        value: value,
    }),
});

const phoneDataUpdateList = ({
    // Insert:(id, colName, value)=>({
    //     type:PHONE_DATA_UPDATE_LIST_INSERT,
    //     id: id,
    //     colName: colName,
    //     value: value,
    // }),
    Change:(id,colName, value) => ({
        type:PHONE_DATA_UPDATE_LIST_CHANGE,
        id: id,
        colName: colName,
        value: value,
    }),
    Delete:(id, colName) => ({
        type:PHONE_DATA_UPDATE_LIST_DELETE,
        id: id,
        colName:colName,
    }),
});

////////////////////////////////////////////////////////

export default function phoneData(state = initialState, action){
    switch(action.type){
        case PHONE_DATA_LOADING:
        case PHONE_DATA_SUCCESS:
        case PHONE_DATA_ERROR:
            return handleAsyncActions(PHONE_DATA)(state,action);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        case PHONE_DATA_ADD:
            return{
                ...state,
                data:{
                    ...state.data,
                    lastId: state.data.lastId +1,
                    rows: state.data.rows.concat({
                        ...dataInitRow,
                        id: state.data.lastId +1,
                    }),
                },
                dataChangeList:{
                    ...state.dataChangeList,
                    dataAddList: state.dataChangeList.dataAddList.concat( state.data.lastId +1),
                }
            };
        case PHONE_DATA_DELETE:
            const dataAddListIdx = state.dataChangeList.dataAddList.findIndex( val => val === action.id);
            // console.log("deleteRow",action);
            return{
                ...state,
                // refData:state.refData.filter(row => row.id !== action.id),
                data:{
                    ...state.data,
                    rows:state.data.rows.filter(row => row.id !== action.id),
                },
                dataChangeList:{
                    ...state.dataChangeList,
                    // 제거할 row가 추가된 row일 경우 addList에서 해당 배열 제거
                    dataAddList: dataAddListIdx === -1
                                 ? state.dataChangeList.dataAddList
                                 : state.dataChangeList.dataAddList.filter(id => id !== action.id),
                    // 제거할 row가 추가된 row가 아닐 경우 deleteList에 추가
                    dataDeleteList: dataAddListIdx === -1
                                 ? state.dataChangeList.dataDeleteList.concat(action.id)
                                 : state.dataChangeList.dataDeleteList,
                    },
            };

        case PHONE_DATA_CHANGE:
            return produce(state, draft=>{
                const row = draft.data.rows.find( row => row.id === action.id);
                row[action.colName] = action.value;
            });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // case PHONE_DATA_UPDATE_LIST_INSERT:
        //     return{
        //         ...state,
        //         dataChangeList:{
        //             ...state.dataChangeList,
        //             dataUpdateList:{
        //                 ...state.dataChangeList.dataUpdateList,
        //                 id : action.id,
        //                 [action.colName] : action.value,
        //             }
        //         }
        //     };
        case PHONE_DATA_UPDATE_LIST_CHANGE:
            return produce(state, draft =>{
                const idx = state.dataChangeList.dataUpdateList.findIndex( row => row.id === action.id);
                // update 리스트에 해당 id가 존재하지 않을경우 추가해줌
                if( idx === -1 ){
                    let initRow = {
                        id : action.id,
                        [action.colName] : action.value
                    };
                    draft.dataChangeList.dataUpdateList.push(initRow);
                //update 리스트에 해당 id가 존재할 경우 column만 추가해줌.
                }else if( action.value !== state.dataChangeList.dataUpdateList[idx][action.colName]){
                    draft.dataChangeList.dataUpdateList[idx][action.colName] = action.value;
                }

            });
        case PHONE_DATA_UPDATE_LIST_DELETE:
            return produce(state,draft=>{
                const idx = state.dataChangeList.dataUpdateList.findIndex( row => row.id === action.id);
                // row에 1개이상 값이 들어있을 떄
                if( idx !== -1){
                    // 해당 column 제거
                    delete draft.dataChangeList.dataUpdateList[idx][action.colName];
                    // 안에남은 원소가 하나도 없으면 row를 삭제함.
                    if( Object.keys(draft.dataChangeList.dataUpdateList[idx]).length<= 1  )
                        draft.dataChangeList.dataUpdateList.splice(idx,1);
                    
                }
            });
        default:
            return state;
    }
}




export {phoneDataFetchAsync,
        //phoneDataChange, phoneDataDelete, phoneDataAdd,
        // phoneDataAddRef,
        phoneDataUpdate,
        phoneDataUpdateList,
        };