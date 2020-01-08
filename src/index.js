import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import Index from '@/views/index.jsx';
import {Provider} from 'react-redux'
import {store} from '@/store'
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Index/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
