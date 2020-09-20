import React from "react";
import {apiBaseUri} from '../../config/client.config';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {IComponentProps} from "../../models/generic";

export default function Apollo({children}: IComponentProps) {

    console.log(apiBaseUri)

    const apolloClient = new ApolloClient({
        uri: apiBaseUri,
        cache: new InMemoryCache()
    })

    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    )
}
