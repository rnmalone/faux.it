import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer as HotLoaderContainer} from 'react-hot-loader';
import {CoreLayout} from './layouts';
import Routes from './routes';
import './styles/main.scss';

import {BrowserRouter} from "react-router-dom";

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(<HotLoaderContainer>
        <BrowserRouter>
            <CoreLayout>
                <Routes/>
            </CoreLayout>
        </BrowserRouter>
    </HotLoaderContainer>,
    MOUNT_NODE);

