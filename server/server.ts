import express, {Request, Response} from 'express';
import cors from 'cors';
import compress from 'compression';
import _debug from 'debug';
import webpackConfig from '../config/webpack.config';
import webpack, {Configuration} from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
const { ApolloServer, gql } = require('apollo-server-express');
import schema from './schema/schema'
import resolvers from './resolvers/employee'

import {assets} from "./middleware";
import bodyParser from "body-parser";

export default function startServer() {
    const server = new ApolloServer({typeDefs: schema, resolvers})

    const webpackCompiler = webpack(webpackConfig as Configuration);
    const debug = _debug('app:server:main');

    let config = require('../config/project.config');
    const app = express();

    app.disable('etag');

    app.set('views', config.paths.public());
    app.set('view engine', 'pug');

    Object.assign(app.locals, config.globals, config.server.templateLocals);

    app.use(cors());
    app.use(compress());

    config = require('../config/project.config');

    debug('Enabling webpack dev and hot reloading middleware.');

    app.use(webpackDevMiddleware(webpackCompiler, {
        publicPath: config.client.basePath
    }));

    app.use(webpackHotMiddleware(webpackCompiler, {
        path: '/__hot_reload'
    }));

    const assetsMiddleware = assets({webpackCompiler});

    webpackCompiler.hooks.done.tap('HashedAssetPlugin', assetsMiddleware.hashedAssetsUpdated);

    server.applyMiddleware({app, path: '/v1/api'})

    app.use(assetsMiddleware)

    app.use(express.static(config.paths.public()));

    app.use('*', (req: Request, res: Response): void => void res.render('index'));

    app.listen(config.server.port)
}

