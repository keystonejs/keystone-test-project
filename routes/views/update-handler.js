var keystone = require('keystone');

var UpdateHandlerTest = keystone.list('UpdateHandlerTest');

module.exports = (req, res) => {
	var view = new keystone.View(req, res);

	res.locals.formData = req.body || {};
	res.locals.validationErrors = {};
	res.locals.formSubmitted = false;

	view.on('post', { action: 'test-update-handler' }, next => {

		var application = new UpdateHandlerTest.model();

		application.getUpdateHandler(req).process(req.body, {
			flashErrors: true,
		}, function (err) {
			if (err) {
				res.locals.validationErrors = err.errors || {};
			} else {
				res.locals.formSubmitted = true;
			}
			next();
		});

	});

	view.render('update-handler');
};
