'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	cache: true,
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
			'react$': path.resolve(__dirname, 'node_modules/react/dist/react.min.js'),
			'react-dom$': path.resolve(__dirname, 'node_modules/react-dom/dist/react-dom.min.js'),
			'redux$': path.resolve(__dirname, 'node_modules/redux/dist/redux.min.js'),
			'react-redux$': path.resolve(__dirname, 'node_modules/react-redux/dist/react-redux.min.js'),
		},
	},
	resolveLoader: {
		modules: ['node_modules']
	},
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    sequences: true,
                    properties: true,
                    drop_debugger: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true,
                    warnings: true
                }
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
