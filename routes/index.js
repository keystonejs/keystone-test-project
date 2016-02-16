var babelify = require('babelify');
var browserify = require('browserify-middleware');
var keystone = require('keystone');

var importRoutes = keystone.importer(__dirname);

var clientConfig = {
	commonPackages: [
		'elemental',
		'react',
		'react-addons-css-transition-group',
		'react-dom',
		'store-prototype',
		'xhr',
	],
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// Bundle common packages
	app.get('/js/packages.js', browserify(clientConfig.commonPackages, {
		cache: true,
		precompile: true,
	}));

	// Serve script bundles
	app.use('/js', browserify('./client/scripts', {
		external: clientConfig.commonPackages,
		transform: [babelify.configure({
			plugins: [require('babel-plugin-transform-object-rest-spread'), require('babel-plugin-transform-object-assign')],
			presets: [require('babel-preset-es2015'), require('babel-preset-react')],
		})],
	}));

	// Views
	app.get('/api', function(req, res) {
		res.render('api', {
			Keystone: {
				csrf_header_key: keystone.security.csrf.CSRF_HEADER_KEY,
				csrf_token_value: keystone.security.csrf.getToken(req, res),
			},
		});
	});

	// Views
	app.use(function(req, res) {
		res.render('index');
	});

};
