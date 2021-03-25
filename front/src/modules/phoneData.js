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
// const PHONE_DATA_ADD_REF = 'phoneData/PHONE_DATA_ADD_REF';
////////////////////////////////////////////////////////
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
// const phoneDataAddRef=(length) =>({
//     type:PHONE_DATA_ADD_REF,
//     length,
// });

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
            // return produce(state, draft=>{
            //     let init = {...dataInitRow};
            //     draft.data.lastId ++;
            //     init.id = draft.data.lastId;
            //     draft.data.rows.push(init);

            //     // 추가 리스트에 추가.
            //     draft.dataChangeList.dataAddList.push(init.id);
            // });
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
            // return produce(state, draft=>{
            //     console.log(action);
            //     //렌더 배열에서 제거함.
            //     // console.log(state.data.rows.filter(row =>row.id !== action.id));

            //     // const refIdx = action.refData.findIndex(row => row.id === action.id);
            //     // draft.refData.splice(refIdx,1);

            //     const idx = state.dataChangeList.dataAddList.findIndex( val => val === action.id);
            //     // 제거할 row가 추가된 row가 아닐 경우 deleteList에 추가
            //     if(  idx === -1 )
            //         draft.dataChangeList.dataDeleteList.push(action.id);
            //     // 제거할 row가 추가된 row일 경우 addList에서 해당 배열 제거
            //     else
            //         draft.dataChangeList.dataAddList.splice(idx,1);


            //     draft.refData = state.refData.filter(row => row.id !== action.id);
            //     draft.data.rows = state.data.rows.filter(row =>row.id !== action.id);

            //     // const rowsIdx = state.data.rows.findIndex(row => row.id === action.id);
            //     // draft.data.rows.splice(rowsIdx,1);
            // });

        case PHONE_DATA_CHANGE:
            return produce(state, draft=>{
                const row = draft.data.rows.find( row => row.id === action.id);
                row[action.colName] = action.value;
            });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // case PHONE_DATA_ADD_REF:
        //     return {
        //         ...state,
        //         refData: state.refData.concat(
        //             {
        //                 id:action.id,
        //                 refs:action.ref,
        //             }
        //         ),
        //     };
        // case PHONE_DATA_ADD_REF:
        //     // console.log("ref추가");
        //     return produce(state, draft=>{
        //         draft.refData.push({id:action.id, refs:action.ref});

                
        //         // const refIdx = state.refData.findIndex(row=>row.id===action.id);
        //         // // row가 존재하지 않을 경우
        //         // if( refIdx === -1 ){
        //         //     draft.refData.push({id:action.id, refs:[action.ref]});
        //         // //row가 존재할 경우
        //         // }else{
        //         //     draft.refData[refIdx].refs.push(action.ref);
        //         // }
                
        //     });
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
            // const idx = state.dataChangeList.dataUpdateList.findIndex( row => row.id === action.id);
            // return{
            //     ...state,
            //     dataChangeList:{
            //         ...state.dataChangeList,
            //         dataUpdateList: idx !== 1 && st
            //     }
            // };
            return produce(state,draft=>{
                const idx = state.dataChangeList.dataUpdateList.findIndex( row => row.id === action.id);
                // row에 1개이상 값이 들어있을 떄
                if( idx !== -1){
                    // 안에남은 원소가 하나도 없으면 row를 삭제함.
                    if( Object.keys(draft.dataChangeList.dataUpdateList[idx]).length <= 1  ){
                        draft.dataChangeList.dataUpdateList.splice(idx,1);
                    }
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