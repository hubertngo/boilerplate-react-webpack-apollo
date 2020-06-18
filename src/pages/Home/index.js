/* eslint-disable jsx-a11y/alt-text */
/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone (+65) 8305 8687
*
* Created: 2020-06-17 00:29:25
*------------------------------------------------------- */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Table } from 'antd';
import styles from './styles.less';

const columns = [
	{
		title: 'id',
		key: 'id',
		dataIndex: 'id',
	},
	{
		title: 'Romaji',
		key: 'romafi',
		dataIndex: 'title',
		render: (data) => {
			return data.romaji;
		},
	},
	{
		title: 'English',
		key: 'english',
		dataIndex: 'title',
		render: (data) => {
			return data.english;
		},
	},
	{
		title: 'Native',
		key: 'native',
		dataIndex: 'title',
		render: (data) => {
			return data.native;
		},
	},
];

const paginationConfig = {
	total: 0,
	showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
	defaultCurrent: 1,
};

const HomePage = () => {
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const query = `
		query ($id: Int, $page: Int, $perPage: Int, $search: String) {
		Page (page: $page, perPage: $perPage) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media (id: $id, search: $search) {
				id
				title {
					romaji
					english
					native
				}
			}
		}
	}
`;
	const { data: pages, loading: initLoading, refetch } = useQuery(gql(query), { variables: { page, perPage } });

	const handleTableChange = (pagination, filters, sorter) => {
		setPage(pagination.current);
		setPerPage(pagination.pageSize);
		refetch({ variables: { page: pagination.current, perPage: pagination.pageSize } });
	};

	return (
		<div className={styles.root}>
			<h1>Navigation One</h1>
			<h2>GraphQL List Example</h2>
			<Table
				columns={columns}
				size="small"
				bordered
				loading={initLoading}
				dataSource={pages?.Page?.media}
				rowKey={(record, i) => record.id + '_row' + i}
				onChange={handleTableChange}
				pagination={{
					...paginationConfig,
					total: pages?.Page?.pageInfo.total,
					pageSize: perPage,
					current: page,
				}}
			/>
		</div>
	);
};

export default HomePage;
