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

const 