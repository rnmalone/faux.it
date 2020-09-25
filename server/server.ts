import express, {Request, Response} from 'express';
import cors from 'cors';
import compress from 'compression';
import _debug from 'debug';
import webpackConfig from '../config/webpack.config';
import webpack, {Configuration} from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import schema from './schema/schema'
import resolvers from './resolvers'
import {assets, clientRenderer} from "./middleware";
import {Connection} from "typeorm";
import {LoggingPlugin} from "./lib/plugins";

const {ApolloServer, gql} = require('apollo-server-express');

export interface IContext {
    connection: Connection
}

export default function startServer(connection: Connection) {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        tracing: process.env.NODE_ENV === 'dev',
        plugins: [
            LoggingPlugin
        ],
        context: () => ({connection})
    })

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
    app.use('/assets', express.static(config.paths.server('assets')))

    app.use('*', clientRenderer);

    app.listen(config.server.port)
}

