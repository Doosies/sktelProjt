import produde from 'immer';

const DATA_ADD_LIST = 'changeData/DATA_ADD_LIST';
const DATA_DELETE_LIST = 'changeData/DATA_DELETE_LIST';
const DATA_CHANGE_LIST = 'changeData/DATA_CHANGE_LIST';

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

const dataAddList = (id) => ({
    type:DATA_ADD_LIST,
});
const dataDeleteList = (id) => ({
    type:DATA_DELETE_LIST,
});
const dataChangeList = () => ({
    type:DATA_CHANGE_LIST,
});


export default function ChangeData(state = initialState, action){
    switch(action.type){
        case DATA_ADD_LIST:
            return{};
        case DATA_DELETE_LIST:
            return{};
        case DATA_CHANGE_LIST:
            return{};
        default:
            return state;
    }
}

export {dataAddList, dataDeleteList, dataChangeList};