import axios from 'axios'

export const SetToken = (token) => {
    if (token) axios.defaults.headers.common['x-auth-token'] = token;
    else delete axios.defaults.headers.common['x-auth-token'];
}
