import {                                                        //reducers are used to update the state according to the type of action executed
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    AUTH_USER,
    AUTH_FAIL,
} from '../actions/Type'

const initialState = {
    token: localStorage.getItem('token'),
    isLoggedin: null,
    loading: true,
    errors: {}
}

const AuthReducer = (state = initialState, action) => {
    const { type, payload } = action;                           //type is the name and payload the body

    switch (type) {
        case REGISTER_SUCCESS:                                  //for type register success the token will be set in the browsers
            localStorage.setItem('token', payload.token);       //local storage and loggin will be set to true and same for all the types on success 
            return {
                ...state,
                isLoggedin: true,
                loading: false
            }

        case REGISTER_FAIL:                                     //for type register fail the token will not be set in the local storage
            localStorage.removeItem('token', payload.token);    //and isLoggedin will be set to false for all other types as well
            return {
                ...state,
                isLoggedin: false,
                errors: payload,
                loading: true
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                isLoggedin: true,
                loading: false
            }

        case LOGIN_FAIL:
            localStorage.removeItem('token', payload.token);
            return {
                ...state,
                isLoggedin: false,
                errors: payload,
                loading: true
            }

        case AUTH_USER:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                isLoggedin: true,
                loading: false
            }
        case AUTH_FAIL:
            localStorage.removeItem('token', payload.token);
            return {
                ...state,
                isLoggedin: false,
                errors: payload,
                loading: true
            }

        default:
            return state
    }
}

export default AuthReducer;