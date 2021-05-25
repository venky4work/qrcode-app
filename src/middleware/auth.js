// import { push } from "connected-react-router";
import { isRSAA, RSAA } from "redux-api-middleware";
import { USER_SIGNUP, USER_SIGN_IN } from "../actions/user";
import { getToken } from "../utils/auth"

const auth = store => next => action => {
    const token = getToken();
    console.log(token);
    // if (!token) {
    //     // store.dispatch(push('/'));
    // }
    const addToken = (action.type === USER_SIGNUP || action.type === USER_SIGN_IN) ? false : true;
    console.log(addToken);
    if (isRSAA(action)) {
        if (addToken) {
            action[RSAA].headers = {
                ...action[RSAA].headers,
                Authorization: `Bearer ${token}`,
            }
        }
    }
    return next(action);
}

export default auth;