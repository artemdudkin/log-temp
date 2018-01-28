'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	cache: true,
	devtool: 'eval-cheap-module-source-map',
//	devtool: 'source-map',
	entry: {
		main : './src/main'
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/dist',
		publicPath: 'dist/',
		library : "globalModule"
	},
	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		unsafeCache: true,
		alias: {
			'react$': path.resolve(__dirname, 'node_modules/react/dist/react-with-addons.js'),
			'react-dom$': path.resolve(__dirname, 'node_modules/react-dom/dist/react-dom.js'),
			'redux$': path.resolve(__dirname, 'node_modules/redux/dist/redux.js'),
			'react-redux$': path.resolve(__dirname, 'node_modules/react-redux/dist/react-redux.js'),
		},
	},
	resolveLoader: {
		modules: ['node_modules']
	},
        plugins: [
					new webpack.DefinePlugin({
						__DEV__: true
					})
        ],
	module: {
		loaders: [{
			test: /\.css$/,
			include: [path.resolve(__dirname, 'src'),
				/node_modules/
			],
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			include: path.resolve(__dirname, 'src'),
			loader: 'file-loader'
		}, {
			test: /\.js$/,
			include: path.resolve(__dirname, 'src'),
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				cacheDirectory: true,
				presets: [['es2015',{"modules":false}], 'react'],
				plugins: [
					'transform-es3-member-expression-literals',
					'transform-es3-property-literals',
					'transform-object-assign',
					'transform-object-rest-spread',
					'transform-decorators-legacy',
					['transform-es2015-classes', {loose: true}],
					'transform-proto-to-assign'
				]
			},
		}]
	}
}
