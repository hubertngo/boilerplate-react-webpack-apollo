/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone (+65) 8305 8687
*
* Created: 2020-06-17 01:10:30
*------------------------------------------------------- */

import React from 'react';

const TestAuth = ({ children }) => {
	console.log('go to test auth');
	return children;
};

TestAuth.propTypes = {
	// classes: PropTypes.object.isRequired,
};

TestAuth.defaultProps = {
	// classes: {},
};

export default TestAuth;
