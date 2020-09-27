import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({                          //creating global UI settings here
    palette: {
        primary: {
            main: '#d97820',
        },
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        button: {
            textTransform: 'none',
        },
    },
});


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>                  
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
