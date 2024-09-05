import { combineReducers } from 'redux';
import userReducer from './userSlice'

const reducer = combineReducers({
    user:userReducer
});


export default reducer;
