import { combineReducers } from 'redux';
import userReducer from './userSlice'
import commonReducer from './commonReducerSlice'
import loaderReducer from './commonLoaderSlice';
import searchSoaReducer from '../features/searchSoa/searchSoaSlice';

const reducer = combineReducers({
    user:userReducer,
    commonActionReducer: commonReducer,
    commonLoader:loaderReducer,
    searchSoa:searchSoaReducer

});


export default reducer;
