/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone (+65) 8305 8687
*
* Created: 2020-04-24 16:20:31
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'src/components/Layout';

const MainLayout = ({ children }) => {
	return (
		<div style={{ display: 'flex', flexFlow: 'column', minHeight: '100vh' }}>
			<Layout>
				{children}
			</Layout>
		</div>
	);
};

MainLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

MainLayout.defaultProps = {
	// classes: {},
};

export default MainLayout;
