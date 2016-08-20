/**
 * Send an email with a test template to an email address
 *
 * Usage:
 * TO=user@keystonejs.com MAILGUN_API_KEY=xyz MAILGUN_DOMAIN=abc TEMPLATE=simple node index
 */

var mailgunApiKey = process.env.MAILGUN_API_KEY;
var template = process.env.TEMPLATE;

var to = process.env.TO;

var mailgunDomain = process.env.MAILGUN_DOMAIN;
var mandrillApiKey = process.env.MANDRILL_API_KEY;

if (!mandrillApiKey && (!mailgunApiKey || !mailgunDomain)) {
	throw Error('You must provide either or both Mailgun or Mandrill auth');
}

var keystone = require('keystone');
keystone.set('emails', './templates');

if (mailgunApiKey) {
	keystone.set('email transport', 'mailgun');
	keystone.set('mailgun api key', mailgunApiKey);
	keystone.set('mailgun domain', mailgunDomain);

	new keystone.Email(template).send({
		to: to,
		from: {
			name: 'Keystone Test Project',
			email: 'test@keystonejs.com',
		},
		subject: 'Keystone Test Email!',
	}, function (err, result) {
		if (err) {
			console.error('🤕 Mailgun test failed with error:\n', err);
		} else {
			console.log('📬 Successfully sent Mailgun test with result:\n', result);
		}
	});
}

if (mandrillApiKey) {
	keystone.set('mandrill api key', mandrillApiKey);

	new keystone.Email({
		templateName: template,
		templateExt: 'pug',
		transport: 'mandrill',
	}).send({}, {
		to: [to],
		from: {
			name: 'Keystone Test Project',
			email: 'test@keystonejs.com',
		},
		subject: 'Keystone Test Email!',
	}, function (err, result) {
		if (err) {
			console.error('🤕 Mandrill test failed with error:\n', err);
		} else {
			console.log('📬 Successfully sent Mailgun test with result:\n', result);
		}
	});
}
