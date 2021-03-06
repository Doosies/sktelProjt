import { createContext, useContext, useReducer } from "react"


const initialPhoneChange = {
    // lastId:null,
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
            return{
                ...state,
                deleteList:state.deleteList.concat(action.id)
            };
        case 'ADD_INSERT_LIST':
            return{
                ...state,
                insertList:state.insertList.concat(action.id),
            };
            // const list = state.deleteList;
            // const id = action.id;
            // if( list.indexOf(id) !== -1)
            //     return {deleteList:list.concat(id)};
            // break;
        
        default:
            throw new Error(`액션을 찾을 수 없음${action.type}`);
    }
}

const PhoneChangeContext = createContext(null);

//export
function PhoneChangeProvider({children}){
    const [state, dispatch] = useReducer(PhoneChangeReducer, initialPhoneChange);
    return(
        <PhoneChangeContext.Provider value={{state, dispatch}}>
            {children}
        </PhoneChangeContext.Provider>
    );
}

function usePhoneChangeContext(){
    const context = useContext(PhoneChangeContext);
    if( !context ) throw new Error('usePhoneChangeState provider 확인바람');
        return context;
}


function addDeleteList(dispatch, id){
    dispatch({type:'ADD_DELETE_LIST', id})
}

export {PhoneChangeProvider, usePhoneChangeContext, addDeleteList};