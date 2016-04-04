/* global Keystone */

import xhr from 'xhr';

const api = {
	post (url, options = {}, callback) {
		if (!options.headers) options.headers = {};
		options.headers[Keystone.csrf_header_key] = Keystone.csrf_token_value;
		xhr.post(url, options, callback);
	},
};

module.exports = api;
