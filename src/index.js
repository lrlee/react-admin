import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import Index from '@/views/index.jsx';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
    <BrowserRouter>
        <Index/>
    </BrowserRouter>
    , document.getElementById('root'));
serviceWorker.unregister();
