import React from "react";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {IComponentProps} from "../../models/generic";

export default function Apollo({ children }: IComponentProps ) {

    const apolloClient = new ApolloClient({
        cache: new InMemoryCache()
    })

    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    )
}
