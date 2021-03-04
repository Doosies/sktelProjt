import { createContext, useContext, useReducer } from "react"


const initialPhoneChange = {
    insertList:[],
    deleteList:[1,2,3],
    updateList:[
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

function PhoneChangeReducer(state, action){
    switch(action.type){
        case 'ADD_DELETE_LIST':{
            const list = state.deleteList;
            const id = action.id;
            if( list.indexOf(id) !== -1)
                return {deleteList:list.concat(id)};
            break;
        }
        default:
            throw new Error(`액션을 찾을 수 없음${action.type}`);
    }
}


const PhoneChangeStateContext = createContext(null);
const PhoneChangeDispatchContext = createContext(null);

//export
function PhoneChangeProvider({children}){
    const [state, dispatch] = useReducer(PhoneChangeReducer, initialPhoneChange);
    return(
        <PhoneChangeStateContext.Provider value={state}>
            <PhoneChangeDispatchContext.Provider value={dispatch}>
                {children}
            </PhoneChangeDispatchContext.Provider>
        </PhoneChangeStateContext.Provider>
    );
}

function usePhoneChangeState(){
    const state = useContext(PhoneChangeStateContext);
    if( !state ) throw new Error('usePhoneChangeState provider 확인바람');
    return state;
}

function usePhoneChangeDispatch(){
    const dispatch = useContext(PhoneChangeDispatchContext);
    if( !dispatch ) throw new Error('usePhoneChangeDispatch provider 확인바람');
    return dispatch;
}

//export
function usePhoneChange(){
    return [usePhoneChangeState(), usePhoneChangeDispatch()];
}

function addDeleteList(dispatch, id){
    dispatch({type:'ADD_DELETE_LIST', id})
}

export {PhoneChangeProvider, usePhoneChange, addDeleteList};