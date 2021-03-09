import phoneData from './phoneData';
import changeData from './changeData';

import { combineReducers} from 'redux';

const rootReducer = combineReducers({
    phoneData, changeData
})

export default rootReducer;