import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';

import LoginRequired from 'src/layout/MainLayout';
import Home from 'src/pages/Home';
import About from 'src/pages/About';
import Users from 'src/pages/Users';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/about">
					<LoginRequired>
						<About />
					</LoginRequired>
				</Route>
				<Route path="/users">
					<LoginRequired>
						<Users />
					</LoginRequired>
				</Route>
				<Route path="/">
					<LoginRequired>
						<Home />
					</LoginRequired>
				</Route>
			</Switch>
		</Router>
	);
}

export default hot(module)(App);
