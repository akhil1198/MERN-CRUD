import axios from 'axios'
import {                                            //actions represent what type of action has been executed
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    AUTH_USER,
    AUTH_FAIL,
} from '../actions/Type'

import { SetToken } from '../auth/SetToken'

export const loadUser = () => async dispatch => {
    if(localStorage.getItem('token')){
        SetToken(localStorage.getItem('token'))

    }
    try {

        const url = 'http://localhost:5000/api/users'
        const response = await axios.get(url)

        dispatch({
            type: AUTH_USER,
            payload: response.data
        })


    } catch (error) {
        console.log(error)
        dispatch({
            type: AUTH_FAIL,
            payload: error
        })
    }
}

export const registerUser = (name, phone, email, password) => async dispatch => {
    try {
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                
            }
        }

        const data = { name, phone, email, password };
        console.log(data)
        const url = 'http://localhost:5000/api/users/register'
        const response = await axios.post(url, config, data)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })

        dispatch(loadUser())        //calling the loadUser function here to make sure the data is successfully registered
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error
        })
    }
}

export const loginUser = (email, password) => async dispatch => {
    try {
        
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const data = JSON.stringify({email, password });

        const url = 'http://localhost:5000/api/users/login'
        const response = await axios.post(url, config, data)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })

        dispatch(loadUser())        //calling the loadUser function here to make sure the data is successfully registered
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        })
    }
}