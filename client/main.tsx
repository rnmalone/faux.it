import '@babel/polyfill';
import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import {AppContainer as HotLoaderContainer} from 'react-hot-loader';
import {CoreLayout} from './layouts';
import Routes from './routes';
import './styles/main.scss';

import {BrowserRouter} from "react-router-dom";
import Apollo from "./containers/Apollo";
import createStore from './store/createStore';

const MOUNT_NODE = document.getElementById('root');

const store = createStore()

ReactDOM.render(
    <HotLoaderContainer>
        <Provider store={store}>
            <Apollo>
                <BrowserRouter basename={'/'}>
                    <CoreLayout>
                        <Routes/>
                    </CoreLayout>
                </BrowserRouter>
            </Apollo>
        </Provider>
    </HotLoaderContainer>,
    MOUNT_NODE
);

