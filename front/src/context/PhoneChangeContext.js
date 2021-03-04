import { createContext, useContext, useReducer } from "react"


const initialPhoneChange = {
    insertList:[],
    deleteList:[],
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
        case 'ADD_DELETE_LIST':
            return {
                state.deleteList.concat(action.id)
            };
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
    if( !state ) throw new Error('provider 확인바람');
    return state;
}

function usePhoneChangeDispatch(){
    const dispatch = useContext(PhoneChangeDispatchContext);
    if( !dispatch ) throw new Error('provider 확인바람');
    return dispatch;
}

//export
function usePhoneChange(){
    return [usePhoneChangeState(), usePhoneChangeDispatch()];
}

function addDeleteList(dispatch, id){
    dispatch({type:'ADD_DELETE_LIST'})
}

export {PhoneChangeProvider, usePhoneChange};