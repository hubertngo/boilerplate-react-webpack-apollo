import React, { Component } from 'react';

import { DatePicker } from 'antd';

class Form extends Component {
	constructor() {
		super();

		this.state = {
			value: '',
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const { value } = event.target;
		this.setState(() => {
			return {
				value,
			};
		});
	}

	render() {
		return (
			<form>
				<h1>Name:</h1>
				<DatePicker />
				<input
					type="text"
					value={this.state.value}
					onChange={this.handleChange}
				/>
			</form>
		);
	}
}

export default Form;
