var keystone = require('keystone');
var transform = require('model-transform');

var NoEdit = new keystone.List('NoEdit', {
	autokey: { from: 'name', path: 'key', unique: true },
	sortable: true,
	noedit: true,
});

NoEdit.add({
	name: { type: String, required: true },
});

transform.toJSON(NoEdit);
NoEdit.register();
