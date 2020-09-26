import {
    REGISTER_SUCCESS, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    AUTH_USER,
    AUTH_FAIL,
} from '../actions/Type'

const initialState = {
    token: localStorage.getItem('token'),
    isAllowedToLogin: false,
    errors: {}
}

const AuthReducer = (state = initialState, action) => {
    const { type, payload } = action;                               //type is the name and payload the body

    switch(type){
        default: return state
    }
}
 
export default AuthReducer;