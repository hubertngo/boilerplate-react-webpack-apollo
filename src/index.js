import React from 'react';
import ReactDOM from 'react-dom';

// Apoolo Config
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

import URL from 'src/constants/url.constant';

import Router from 'src/pages';
import 'src/assets/theme/less/index.less';

// Set user token after login

// import { getUserToken } from 'src/utils/Auth';
const { GRAPHQL_URL } = URL;

const awsGraphqlFetch = async (uri, options) => {
	// const token = await getUserToken();
	// options.headers.Authorization = token;
	return fetch(uri, options);
};

const client = new ApolloClient({
	link: new HttpLink({
		uri: GRAPHQL_URL,
		fetch: awsGraphqlFetch,
	}),
	cache: new InMemoryCache(),
	// defaultOptions,
});

const wrapper = document.getElementById('container');

const Main = () => {
	return (
		<ApolloProvider client={client}>
			<Router />
		</ApolloProvider>
	);
};

ReactDOM.render(<Main />, wrapper);
