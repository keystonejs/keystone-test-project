var keystone = require('keystone');
var config = require('./config');

/**
 * This is an example of how to use the advanced API to start Keystone,
 * allowing you to customise how app.listen is called
 */

keystone.init(config.options);
keystone.import('models');
keystone.set('locals', config.locals);
keystone.set('routes', require('./routes'));
keystone.set('nav', config.nav);

keystone.initExpressApp();
keystone.openDatabaseConnection(function () {
	var server = keystone.app.listen(process.env.PORT || 3002, function () {
		console.log('-------------------------------');
		console.log('Keystone server ready on port %d', server.address().port);
		console.log('-------------------------------');
	});
});
