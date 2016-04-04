var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Job = new keystone.List('Job', {
	autokey: { from: 'name', path: 'key', unique: true },
	track: true,
});

Job.set('notes', {
	isFeatured: 'Featured jobs are displayed first on the home page',
});

Job.add({
	name: { type: String, initial: true, required: true, index: true },
	jobState: { type: Types.Select, options: 'draft, published, filled, archived', default: 'draft', index: true },
	jobType: { type: Types.Select, options: ['full-time', 'part-time', 'casual', 'other'], index: true },
	jobRole: { type: Types.Select, options: ['accounting', 'admin', 'customer-service', 'human-resources', 'information-technology', 'sales-marketing', 'other'], index: true },
	isFeatured: { type: Boolean, index: true },
	startDate: { type: Types.Date },
	publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true },
});

Job.add('Contact Information', {
	email: { type: Types.Email },
	phone: { type: String, width: 'short' },
	phoneViews: { type: Types.Number },
	website: { type: Types.Url, collapse: true },
	location: { type: Types.Location, collapse: true },
});

Job.add('Description', {
	pay: { type: Types.Money },
	payPer: { type: Types.Select, options: ['hour', 'week', 'fortnight', 'month', 'year'], index: true },
	payDescription: { type: Types.Textarea, collapse: true },
	imageCaption: { type: String, collapse: true },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		summary: { type: Types.Html, hidden: true },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
});

transform.toJSON(Job);
Job.defaultColumns = 'name, jobState|15%, jobType|15%, jobRole|15%';
Job.register();
