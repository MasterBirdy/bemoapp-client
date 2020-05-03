import React from "react";
import Head from "next/head";

import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../utils/apollo";

import { createGlobalStyle } from "styled-components";
import { config, dom } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
const GlobalStyles = createGlobalStyle`
    ${dom.css()}
`;

const App = ({ Component, pageProps, apollo }) => {
    return (
        <ApolloProvider client={apollo}>
            <Head>
                <title>CDA Interview Website</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Component {...pageProps} />
            <GlobalStyles />
        </ApolloProvider>
    );
};

// Wraps all components in the tree with the data provider
export default withData(App);
