import produce from 'immer';

export const handleListActions = (type) =>{
    const [
        ADD_LIST_CHANGE,  
        ADD_LIST_DELETE,
        UPDATE_LIST_CHANGE,
        UPDATE_LIST_DELETE
    ] = [
        `${type}_ADD_LIST_CHANGE`,
        `${type}_ADD_LIST_DELETE`,
        `${type}_UPDATE_LIST_CHANGE`,
        `${type}_UPDATE_LIST_DELETE`
    ];

    return (state, action) =>{
        return produce( state,draft=>{
            let dataState;
            let dataDraft;
            // 액션 타입에 따라 state, draft를 구분지음
            if(action.type === UPDATE_LIST_CHANGE || action.type === UPDATE_LIST_DELETE ){
                dataState = state.dataChangeList.dataUpdateList;
                dataDraft = draft.dataChangeList.dataUpdateList;
            }
            else if(action.type === ADD_LIST_CHANGE || action.type === ADD_LIST_DELETE ){
                dataState = state.dataChangeList.dataAddList;
                dataDraft = draft.dataChangeList.dataAddList;
            }
            // 데이터가 리스트에 있는지 확인
            const dataListIndex = dataState.findIndex( row => row.id === action.id);
            // 리스트에 없을시 넣을 값
            const updateData = {
                id : action.id,
                [action.colName] : action.value
            }
            
            switch( action.type ){
                case ADD_LIST_CHANGE:
                case UPDATE_LIST_CHANGE:
                    // 아이디가 없으면
                    if( dataListIndex === -1)
                        dataDraft.push(updateData);
                    //update 리스트에 해당 id가 존재할 경우 column만 추가 or 변경
                    else if( action.value !== dataState[dataListIndex][action.colName])
                        dataDraft[dataListIndex][action.colName] = action.value;
                    break;

                case ADD_LIST_DELETE:
                case UPDATE_LIST_DELETE:
                    // row에 1개이상 값이 들어있을 떄
                    if( dataListIndex !== -1){
                        // 해당 column 제거
                        delete dataDraft[dataListIndex][action.colName];
                        // 안에남은 원소가 하나도 없으면 row를 삭제함.
                        if( Object.keys(dataDraft[dataListIndex]).length<= 1  )
                            dataDraft.splice(dataListIndex,1);
                    }
                    break;
                default:
                    return state;
            }
        });
    }
}