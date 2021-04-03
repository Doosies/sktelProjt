import phoneData from './phoneData';
import modal from './modal';

import { combineReducers} from 'redux';

const rootReducer = combineReducers({
    phoneData,modal
})

export default rootReducer;