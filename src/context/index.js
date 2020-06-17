/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-09-04 00:03:29
*------------------------------------------------------- */

import React, { Component } from 'react';

import { getUserAuth } from 'src/utils/Auth';

/* First we will make a new context */
const Context = React.createContext();

/* Then create a provider Component */
class Provider extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				data: {},
				loading: true,
			},
			// LoginRedirect: '/',
		};
	}

	componentDidMount = async () => {
		const user = await getUserAuth();
		this.setState({
			user: {
				data: user,
				loading: false,
			},
		});
	}

	// setLoginRedirect = (LoginRedirect) => {
	// 	this.setState({ LoginRedirect });
	// };

	render() {
		return (
			<Context.Provider value={this.state} setLoginRedirect={this.setLoginRedirect}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

/* then make a consumer which will surface it */
// eslint-disable-next-line prefer-destructuring
const Consumer = Context.Consumer;

export default Provider;
export { Consumer };
