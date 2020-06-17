/* eslint-disable no-nested-ternary */
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:38:42
*------------------------------------------------------- */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link, useHistory } from 'react-router-dom';

import { Layout, Avatar, Divider, Popover, Menu } from 'antd';
import {
	LogoutOutlined,
	SettingOutlined,
	UserOutlined,
	MailOutlined,
	AppstoreOutlined,
} from '@ant-design/icons';

import Header from 'src/components/Layout/Header';
import Footer from 'src/components/Layout/Footer';
import Logo from 'src/assets/images/logo.svg';

import classes from './style.less';

const { Content } = Layout;
const { SubMenu } = Menu;

const propTypes = {
	children: PropTypes.any,
};

const defaultProps = {
	children: null,
};

const handleLogout = () => {
	console.log('click logout');
};

const MainLayout = (props) => {
	const { children } = props;
	const [current, setKey] = useState('mail');
	const Router = useHistory();

	const content = (
		<div className={classes.content}>
			<div className={classes.itemWrapper}>
				<div className={classes.item}>
					<UserOutlined />
					<span>Profile</span>
				</div>
				<div className={classes.item}>
					<SettingOutlined />
					<span>Change Password</span>
				</div>
			</div>
			<Divider className="divider" />
			<div className={classes.itemWrapper}>
				<div className={classes.item} onClick={handleLogout}>
					<LogoutOutlined />
					<span>Logout</span>
				</div>
			</div>
		</div>
	);

	const handleClick = (e) => {
		switch (e.key) {
			case 'mail':
				Router.push('/');
				break;
			case 'app':
				Router.push('/about');
				break;
			default:
				Router.push('/users');
		}
		setKey(e.key);
	};

	console.log('current', current);

	return (
		<Layout className={classes.wrapper}>
			<Layout className={classes.siteLayout}>
				<Header>
					<Link to="/">
						<div className={classes.logoCenter}>
							<img src={Logo} alt="logo" height="25" />
							<span>Boilerplate</span>
						</div>
					</Link>
					<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
						<Menu.Item key="mail" icon={<MailOutlined />}>
							Navigation One
						</Menu.Item>
						<Menu.Item key="app" icon={<AppstoreOutlined />}>
							Navigation Two
						</Menu.Item>
						<SubMenu icon={<SettingOutlined />} title="Navigation Three - Submenu">
							<Menu.ItemGroup title="Item 1">
								<Menu.Item key="setting:1">Option 1</Menu.Item>
								<Menu.Item key="setting:2">Option 2</Menu.Item>
							</Menu.ItemGroup>
							<Menu.ItemGroup title="Item 2">
								<Menu.Item key="setting:3">Option 3</Menu.Item>
								<Menu.Item key="setting:4">Option 4</Menu.Item>
							</Menu.ItemGroup>
						</SubMenu>
						<Menu.Item key="alipay">
							<a href="https://ant.design" target="_blank" rel="noopener noreferrer">
								Navigation Four - Link
							</a>
						</Menu.Item>
					</Menu>
					<div className={classes.headerRight}>
						<Popover
							content={content}
							title="Hubert Ngo"
							trigger="click"
							placement="bottomRight"
						>
							<Avatar
								style={{ marginLeft: '80px' }}
								src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
							/>
						</Popover>
					</div>
				</Header>
				<Content
					style={{
						padding: '50px',
					}}
				>
					{children}
				</Content>
				<Footer />
			</Layout>
		</Layout>
	);
};

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
