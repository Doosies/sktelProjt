
const DATA_ADD_LIST_INSERT = 'changeData/DATA_ADD_LIST_INSERT';
const DATA_DELETE_LIST_INSERT = 'changeData/DATA_DELETE_LIST_INSERT';
const DATA_CHANGE_LIST_INSERT = 'changeData/DATA_CHANGE_LIST_INSERT';

const initialState = {
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

const dataAddListInsert = (id) => ({
    type:DATA_ADD_LIST_INSERT,
    id: id,
});
const dataDeleteList = (id) => ({
    type:DATA_DELETE_LIST_INSERT,
});
const dataChangeList = () => ({
    type:DATA_CHANGE_LIST_INSERT,
});


export default function ChangeData(state = initialState, action){
    switch(action.type){
        case DATA_ADD_LIST_INSERT:
            return{
                ...state,
                dataAddList:state.dataAddList.concat(action.id+1),
            };
        case DATA_DELETE_LIST_INSERT:
            return{};
        case DATA_CHANGE_LIST_INSERT:
            return{};
        default:
            return state;
    }
}

export {dataAddListInsert, dataDeleteList, dataChangeList};