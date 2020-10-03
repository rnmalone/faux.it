import '@babel/polyfill';
import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import {AppContainer as HotLoaderContainer} from 'react-hot-loader';
import {CoreLayout} from './layouts';
import Routes from './routes';
import './styles/main.scss';

import {BrowserRouter} from "react-router-dom";
import createStore from './store/createStore';
import {Apollo, AppIntlProvider} from "./containers";

const MOUNT_NODE = document.getElementById('root');

const {localeMessages, supportedLanguages} = window.__INITIAL_STATE__
const store = createStore({
    locale: {
        localeMessages,
        supportedLanguages,
    }
})

ReactDOM.render(
    <HotLoaderContainer>
        <Provider store={store}>
            <AppIntlProvider>
                <Apollo>
                    <BrowserRouter basename={'/'}>
                        <CoreLayout>
                            <Routes/>
                        </CoreLayout>
                    </BrowserRouter>
                </Apollo>
            </AppIntlProvider>
        </Provider>
    </HotLoaderContainer>,
    MOUNT_NODE
);

