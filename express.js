/**
 * This is an example of creating a custom express app, binding the Admin UI
 * router to it, and using Keystone to intialise the database connection
 */

var compression = require('compression');
var express = require('express');
var keystone = require('keystone');
var morgan = require('morgan');

var config = require('./config');

var app = new express();

keystone.init(config.options);
keystone.import('models');
keystone.set('locals', config.locals);
keystone.set('routes', require('./routes'));
keystone.set('nav', config.nav);

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

app.use(function (req, res) {
	res.redirect('/keystone');
});

keystone.openDatabaseConnection(function () {
	var server = app.listen(process.env.PORT || 3001, function () {
		console.log('-------------------------------');
		console.log('Express server ready on port %d', server.address().port);
		console.log('-------------------------------');
	});
});
