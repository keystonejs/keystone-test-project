var keystone = require('keystone');
var Types = keystone.Field.Types;

var AnalyticsEvent = new keystone.List('AnalyticsEvent', {
	track: true,
});

// Master list
AnalyticsEvent.add({
	name: { type: String, required: true },
});

AnalyticsEvent.register();

// Secondary list
var LoginAnalyticsEvent = new keystone.List('Login', {
	inherits: AnalyticsEvent,
});

LoginAnalyticsEvent.add({
	user: { type: Types.Relationship, ref: 'User' },
});

// Secondary List
var PageViewAnalyticsEvent = new keystone.List('PageView', {
	inherits: AnalyticsEvent,
});

PageViewAnalyticsEvent.add({
	page: { type: String },
});

LoginAnalyticsEvent.register();
PageViewAnalyticsEvent.register();
