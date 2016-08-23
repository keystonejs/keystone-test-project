var keystone = require('keystone');

var UpdateHandlerTest = keystone.list('UpdateHandlerTest');

module.exports = (req, res) => {
	var view = new keystone.View(req, res);

	res.locals.formData = req.body || {};
	res.locals.validationErrors = {};

	view.on('post', { action: 'test-update-handler' }, next => {
		// Get the UpdateHandler
		var application = new UpdateHandlerTest.model();
		application.getUpdateHandler(req).process(req.body, {
			// Show flash messages for errors
			flashErrors: true,
			required: 'name.first, name.last, email',
		}, function (err) {
			if (err) {
				// Show validation errors inline
				res.locals.validationErrors = err.errors || {};
				return next();
			} else {
				// Flash a success message when everything worked out
				req.flash('success', 'Successfully submitted form! Redirecting to test #2 in 3 seconds...');
				res.locals.redirectToNextStage = true;
				return next();
			}
		});
	});

	view.render('update-handler');
};
