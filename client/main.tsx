import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer as HotLoaderContainer} from 'react-hot-loader';
import {CoreLayout} from './layouts';
import Routes from './routes';
import './styles/main.scss';

import {BrowserRouter} from "react-router-dom";
import Apollo from "./containers/Apollo";

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
    <HotLoaderContainer>
        <Apollo>
            <BrowserRouter>
                <CoreLayout>
                    <Routes/>
                </CoreLayout>
            </BrowserRouter>
        </Apollo>
    </HotLoaderContainer>,
    MOUNT_NODE
);

