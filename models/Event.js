var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Event = new keystone.List('Event', {
	autokey: { from: 'name', path: 'key', unique: true },
	track: true,
});

var deps = {
	videoEmbed: { videoEmbed: true, videoEmbedData: { exists: true } },
};

Event.add({
	name: { type: String, initial: true, required: true, index: true },
	eventType: { type: Types.Select, options: [ 'workshop', 'retreat', 'course', 'festival' ], index: true },
	eventState: { type: Types.Select, options: 'new, draft, published, suspended, archived', index: true },
	startDate: { type: Types.Date, initial: true, required: true },
	endDate: { type: Types.Date, initial: true },
});

Event.add('Contact Information', {
	phone: { type: String, width: 'short' },
	website: { type: Types.Url, collapse: true },
	location: { type: Types.Location, collapse: true, initial: true, required: ['suburb'] },
	bookingUrl: { type: Types.Url, collapse: true },
});

Event.add('Description', {
	price: { type: String, collapse: true },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		summary: { type: Types.Html, hidden: true },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	schedule: { type: Types.Html, wysiwyg: true, collapse: true },
});

transform.toJSON(Event);
Event.defaultColumns = 'name, eventType|15%, eventState|15%, startDate|15%';
Event.register();
