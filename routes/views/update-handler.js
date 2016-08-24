var keystone = require('keystone');

var UpdateHandlerTest = keystone.list('UpdateHandlerTest');

module.exports = (req, res) => {
	var view = new keystone.View(req, res);

	res.locals.formData = {};
	res.locals.validationErrors = {};

	view.on('post', { action: 'test-update-handler' }, next => {
		// Get the UpdateHandler
		var application = new UpdateHandlerTest.model();
		application.getUpdateHandler(req).process(req.body, {
			// Show flash messages for errors
			flashErrors: true,
			// Log database errors
			logErrors: true,
			// Save these fields to the model
			fields: 'name, email, image',
			// Require all fields to be specified, no matter what it says in the model
			required: 'name, email',
			// Show custom title in error flash message
			errorMessage: '[Custom Error Message] There were some errors:',
			// Show custom required messages
			requiredMessages: {
				name: 'Please enter your name',
			},
			// Show custom invalid messages
			invalidMessages: {
				email: 'Email must be in the format hello@thinkmill.com.au',
			},
		}, function (err) {
			if (err) {
				// Pass the error messages to the Jade template for inline handling
				res.locals.validationErrors = err.detail;
				// Pass req.body as formData to default fields to previously entered values
				res.locals.formData = req.body;
				return next();
			} else {
				// Flash a success message when everything worked out
				req.flash('success', 'Item saved successfully');
				res.locals.result = application;
				return next();
			}
		});
	});

	view.render('update-handler');
};
