import 'jest-enzyme';

declare module '*.graphql' {
    import {DocumentNode} from "graphql";
    const Schema: DocumentNode

    export = Schema
}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any,
        __INITIAL_STATE__: any
    }
}
