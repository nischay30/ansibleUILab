var path = require("path");
module.exports = {
	entry:'./public/App.jsx',
	output : {

		path: path.resolve(__dirname, "public/assets"),
		publicPath: "/assets/",
		filename: "bundle.js"
	},
	module:{
		loaders:[
		{
			test: /\.jsx/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react','stage-1']
			} 
		},
		{ test: /\.css$/, loader: "style-loader!css-loader" }
		]
	},
	resolve: {
		extensions:['','.js','.jsx','/index','/index.js','/index.jsx']
	}
};