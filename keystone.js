var keystone = require('keystone');
var config = require('./config');

keystone.init(config.options);
keystone.import('models');
keystone.set('locals', config.locals);
keystone.set('routes', require('./routes'));
keystone.set('nav', config.nav);

keystone.start({
	onMount () { console.log('Application Mounted'); },
	onStart () { console.log('Application Started'); },
});
