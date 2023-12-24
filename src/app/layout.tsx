"use client"

import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import React from "react";

export default function RootLayout({children}: { children: React.ReactNode }) {

    const link = createHttpLink({
        uri: "http://localhost:8080/query",
        credentials: "include",
    });
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: link,
    });

    return (
        <html lang="ja">
            <body >
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
            </body>
        </html>
    )
}