/* global Keystone */

import xhr from 'xhr';

const api = {
	post (url, options = {}, callback) {
		if (!options.headers) options.headers = {};
		options.headers[Keystone.csrf_header_key] = Keystone.csrf_token_value;
		xhr.post(url, options, (err, res, body) => {
			// Handle Unauthorized responses by redirecting to the signin page
			if (res && res.statusCode === 401) {
				alert('Please sign in to run the API Tests');
				var from = window.location.pathname;
				window.location.href = '/keystone/signin?from=' + from;
			} else {
				callback(err, res, body);
			}
		});
	},
};

module.exports = api;
