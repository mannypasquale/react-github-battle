var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// html webpack plugin allows us and it will create index.html file for us and put it in the dist folder for us and include the script 
// 'index_bundle.js' into the index.html file for us YAA!
//
// when it puts things into dist folder, BUT when we made our first component we told react to RENDER REAct component with element id 'app'
// when our code is transpiled it will put it 'dist' folder but PROBLEM the html file that has element with id 'app' aint there
//
// webpack has html plugin that does that for us and creeate index.html and put it into our dist folder and include our script for us
module.exports = {
	entry: './app/index.js',
	output: {
		// path. resolve means we need path which is always a part of npm
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	// rules are the loaders of transformations we want to make
	module: {
   	 rules: [
		 // regular expression that uses babel-loader on anything that has a .js extension
		 // and .css extension it will run through our style-loader and css loader
		 // if you need older browser to use the new class js
		 // in package.json add a babel preset for "env" and "react" the env
		 // will tell it to transpile to latest version of JavaScript so as years go on your code will support latest versions of JS
		 // the "react" will transpile jsx into create element invocations
		 // css loader will take all .css files and change those to be require statements
		 // style loader will take css and insert them into the page if the styles are active on that page
		 // the require('index.css') in our index.js will be valid throughout the app
     	   { test: /\.(js)$/, use: 'babel-loader' },
     	   { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    	]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // we can pass it a template we want to use since we need an html file that has an element with id app
	    // it will take the index.html file we created and use it as our template and put this file inside the dist folder
	    // and will include script that will reference our newely bunddled js file
	    template: 'app/index.html'
    })
  ],
  mode: "development"
};
