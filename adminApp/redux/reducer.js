import { combineReducers } from 'redux';
import userReducer from './userSlice'
import commonReducer from './commonReducerSlice'
import brokerReducer from '../components/searchBroker/searchBrokerSlice'
import loaderReducer from './commonLoaderSlice';
import searchSoaReducer from '../features/searchSoa/searchSoaSlice';
import logoutReducer from './logoutSlice'
import ifaLookupReducer from '../features/IFAOnBoarding/ifaLookupSlice';

const reducer = combineReducers({
    user:userReducer,
    commonActionReducer: commonReducer,
    commonLoader:loaderReducer,
    broker: brokerReducer,
    searchSoa:searchSoaReducer,
    logout:logoutReducer,
    ifaLookup:ifaLookupReducer

});


export default reducer;
