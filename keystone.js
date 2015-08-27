var keystone = require('keystone');

keystone.init({

	'name': 'Keystone Test',
	'brand': 'Keystone Test',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': '&#34;fF-ELbvoJ|P6:$&lt;;3c-Cen8OJJy[W1&amp;i@O.M)-%&lt;&gt;QTiTvC93&lt;n;R@!vD@A6N=7',

});

keystone.import('models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));
keystone.set('nav', {
	'users': ['users', 'companies'],
	'content': ['posts', 'post-categories']
});

keystone.start();
