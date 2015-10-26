/**
 * This is an example of creating a simple express app and
 * binding the Admin UI router to it without using Keystone.start()
 */

var bodyParser = require('body-parser');
var compression = require('compression');
var express = require('express');
var keystone = require('keystone');
var morgan = require('morgan');
var multer = require('multer');

var app = new express();

keystone.init({

	'name': 'Keystone Test',
	'brand': 'Keystone Test',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'cloudinary config': 'cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': '&#34;fF-ELbvoJ|P6:$&lt;;3c-Cen8OJJy[W1&amp;i@O.M)-%&lt;&gt;QTiTvC93&lt;n;R@!vD@A6N=7',

});

keystone.import('models');

keystone.set('locals', {
	env: keystone.get('env'),
});

keystone.set('nav', {
	'people': ['users', 'companies', 'contacts'],
	'content': ['posts', 'post-categories', 'events', 'jobs'],
	'test-schemas': ['autocreates', 'field-tests'],
});

keystone.initDatabase();
keystone.initExpressSession();

app.use(compression());
app.use('/keystone', keystone.Admin.Server.createStaticRouter(keystone));
app.use(express.static('public'));

app.use(keystone.get('session options').cookieParser);
app.use(keystone.expressSession);
app.use(keystone.session.persist);
app.use(require('connect-flash')());

app.use(morgan('tiny'));
app.use('/keystone', keystone.Admin.Server.createDynamicRouter(keystone));

app.use(function(req, res) {
	res.redirect('/keystone');
});

keystone.openDatabaseConnection(function() {
	var server = app.listen(process.env.PORT || 3001, function() {
		console.log('-------------------------------');
		console.log('Admin server ready on port %d', server.address().port);
		console.log('-------------------------------');
	});
});
