import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import user from './user';
import urls from './urls';

// eslint-disable-next-line import/no-anonymous-default-export
export default history => 
combineReducers({
    router: connectRouter(history),
    user,
    urls,
});