import 'jest-enzyme';

declare module '*.graphql' {
    import {DocumentNode} from "graphql";
    const Schema: DocumentNode

    export = Schema
}

interface IWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}
