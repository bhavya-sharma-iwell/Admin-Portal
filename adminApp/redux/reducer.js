import { combineReducers } from 'redux';
import userReducer from './userSlice'
import commonReducer from './commonReducerSlice'

const reducer = combineReducers({
    user:userReducer,
    commonActionReducer: commonReducer,
});


export default reducer;
