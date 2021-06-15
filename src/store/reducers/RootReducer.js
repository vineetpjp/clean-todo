import { combineReducers } from "redux";
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import todo from "./Todo";

const persistConfig = {
    key:'root',
    storage,
    whitelist:['todo']
}

const rootReducer = combineReducers({
    todo,
});

export default persistReducer(persistConfig,rootReducer);
