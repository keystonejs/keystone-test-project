exports.options = {

	'name': 'Keystone Test',
	'brand': 'Keystone Test',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	'cloudinary config': 'cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': '&#34;fF-ELbvoJ|P6:$&lt;;3c-Cen8OJJy[W1&amp;i@O.M)-%&lt;&gt;QTiTvC93&lt;n;R@!vD@A6N=7',

};

exports.locals = {
	env: process.NODE_ENV,
	utils: require('keystone-utils'),
};

exports.nav = {
	'people': ['users', 'companies', 'contacts'],
	'content': ['posts', 'post-categories', 'events', 'jobs', 'galleries', 'files'],
	'test-schemas': ['autocreates', 'field-tests', 'update-handler-tests', 'no-edits'],
	'analytics': ['analytics-events', 'logins', 'page-views'],
};
