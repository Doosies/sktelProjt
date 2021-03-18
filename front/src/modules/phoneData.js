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
const PHONE_DATA_ADD_REF = 'phoneData/PHONE_DATA_ADD_REF';
////////////////////////////////////////////////////////
const PHONE_DATA_UPDATE_LIST_CHANGE = 'phoneData/PHONE_DATA_UPDATE_LIST_CHANGE';
const PHONE_DATA_UPDATE_LIST_DELETE = 'phoneData/PHONE_DATA_UPDATE_LIST_DELETE';

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
    refData:[],
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
const phoneDataAddRef=(id, ref) =>({
    type:PHONE_DATA_ADD_REF,
    id:id,
    ref:ref,
});

const phoneDataUpdateList = ({
    Change:(id,colName, value) => ({
        type:PHONE_DATA_UPDATE_LIST_CHANGE,
        id: id,
        colName: colName,
        value: value,
    }),
    Delete:(id, colName) => ({
        type:PHONE_DATA_UPDATE_LIST_DELETE,
        id: id,
    }),
});

////////////////////////////////////////////////////////

export default function phoneData(state = initialState, action){
    // console.log(`add: ${state.dataChangeList.dataAddList}, delete: ${state.dataChangeList.dataDeleteList}, change: ${state.dataChangeList.dataUpdateList}`);
    switch(action.type){
        case PHONE_DATA_LOADING:
        case PHONE_DATA_SUCCESS:
        case PHONE_DATA_ERROR:
            return handleAsyncActions(PHONE_DATA)(state,action);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        case PHONE_DATA_ADD:
            return produce(state, draft=>{
                let init = {...dataInitRow};
                draft.data.lastId ++;
                init.id = draft.data.lastId;
                draft.data.rows.push(init);

                // 추가 리스트에 추가.
                draft.dataChangeList.dataAddList.push(init.id);

                // ref 추가
                // draft.refData[draft.data.lastId].refs.push(action.ref);
            });
        case PHONE_DATA_DELETE:
            return produce(state, draft=>{
                //렌더 배열에서 제거함.
                draft.data.rows = draft.data.rows.filter(row =>row.id !== action.id);

                const idx = state.dataChangeList.dataAddList.findIndex( val => val === action.id);
                // 제거할 row가 추가된 row가 아닐 경우
                // deleteList에 추가
                if(  idx === -1 )
                    draft.dataChangeList.dataDeleteList.push(action.id);
                // 제거할 row가 추가된 row일 경우
                // addList에서 해당 배열 제거
                else
                    draft.dataChangeList.dataAddList.slice(idx,1);
                
                
            });
        case PHONE_DATA_CHANGE:
            return produce(state, draft=>{
                const row = draft.data.rows.find( row => row.id === action.id);
                row[action.colName] = action.value;
            });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        case PHONE_DATA_ADD_REF:
            return produce(state, draft=>{
                if( action.id !== ""){
                    console.log(action);
                    const refIdx = state.refData.findIndex(row => row.id === action.id );
                    if( refIdx === -1 )
                        draft.refData.push({id:action.id,refs:action.ref});
                    // //존재하면
                    else
                        draft.refData[refIdx].refs.push(action.ref);
                }
            });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        case PHONE_DATA_UPDATE_LIST_CHANGE:
            return produce(state, draft =>{
                const idx = state.dataChangeList.dataUpdateList.findIndex( row => row.id === action.id);
                // update 리스트에 해당 id가 존재하지 않을경우 추가해줌
                if( idx === -1 ){
                    let initRow = {};
                    initRow.id = action.id;
                    initRow[action.colName] = action.value;
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
                    delete draft.dataChangeList.dataUpdateList[idx][action.colName];
                    // 안에남은 원소가 하나도 없으면 row를 삭제함.
                    if( Object.keys(draft.dataChangeList.dataUpdateList[idx]).length <= 1  ){
                        draft.dataChangeList.dataUpdateList.slice(idx,1);
                    }
                }
            });
        default:
            return state;
    }
}




export {phoneDataFetchAsync,
        //phoneDataChange, phoneDataDelete, phoneDataAdd,
        phoneDataAddRef,
        phoneDataUpdate,
        phoneDataUpdateList,
        };