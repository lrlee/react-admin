import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import Index from '@/views/index.jsx';
import * as serviceWorker from './serviceWorker';
window.bussionId = 'ad6613e3-04b9-4401-ab35-9e8690e06a10'
ReactDOM.render(
    <BrowserRouter>
        <Index/>
    </BrowserRouter>
    , document.getElementById('root'));
serviceWorker.unregister();
