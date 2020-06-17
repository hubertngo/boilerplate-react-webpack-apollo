const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');

require('dotenv').config();

const { env } = process;

const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	return prev;
}, {});

const fileExtensions = [
	'jpg',
	'jpeg',
	'png',
	'gif',
	'eot',
	'otf',
	'svg',
	'ttf',
	'woff',
	'woff2',
];
const themeVariables = lessToJS(fs.readFileSync(path.join(__dirname, 'src/assets/theme/less/variables.less'), 'utf8'));

const options = {
	mode: env.NODE_ENV,
	devtool: env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map',
	node: {
		fs: 'empty',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: env.NODE_ENV === 'production' ? true : {
								mode: 'local',
								localIdentName: '[folder]__[local]__[hash:base64:5]',
								context: path.resolve(__dirname, 'src'),
							},
							sourceMap: env.NODE_ENV !== 'production',
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer],
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: env.NODE_ENV === 'production' ? true : {
								mode: 'local',
								localIdentName: '[folder]__[local]__[hash:base64:5]',
								context: path.resolve(__dirname, 'src'),
							},
							sourceMap: env.NODE_ENV !== 'production',
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer],
						},
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
							sourceMap: env.NODE_ENV !== 'production',
							modifyVars: {
								'hack': `true;@import "${path.resolve(__dirname, 'src/assets/theme/less/color/colors.less')}";`,
								...themeVariables,
							},
						},
					},
				],
				exclude: [/node_modules/, path.resolve(__dirname, 'src/assets/theme')],
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
							sourceMap: env.NODE_ENV !== 'production',
						},
					},
				],
				include: [/node_modules/, path.resolve(__dirname, 'src/assets/theme')],
			},
			{
				test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
				loader: 'file-loader?name=[name].[ext]',
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
	},
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		stats: {
			children: false,
			maxModules: 0,
		},
		compress: true,
		historyApiFallback: true,
		port: env.PORT || 9000,
	},
	plugins: [
		new webpack.DefinePlugin(envKeys),
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new webpack.ProgressPlugin(),
		// clean the build folder
		new CleanWebpackPlugin({
			verbose: true,
			// cleanStaleWebpackAssets: false,
		}),
	],
};

// if (env.NODE_ENV === 'development') {
// 	options.devtool = 'cheap-module-eval-source-map';
// }

module.exports = options;
