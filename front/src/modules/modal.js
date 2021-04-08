const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';

const initialModalState = {
    isShow:'',
    title:'',
    text:'',
};


const showModal = (title, text) =>({
    type: SHOW_MODAL,
    title,
    text,
});
const hideModal = () =>({
    type: HIDE_MODAL,
});

export default function modal(state = initialModalState, action){
    // console.log("modal-> ", state, action);
    switch(action.type){
        case SHOW_MODAL:
            return{
                ...state,
                isShow: true,
                title: action.title,
                text: action.text,
            };
        case HIDE_MODAL:
            return{
                ...state,
                isShow: false,
                title: '',
                text: '',
            };
        default:
            return state;    
        }
}

export {showModal, hideModal};