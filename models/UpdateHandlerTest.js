var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var UpdateHandlerTest = new keystone.List('UpdateHandlerTest', {
	nocreate: true,
	track: true,
});

UpdateHandlerTest.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email },
	image: { type: Types.CloudinaryImage },
});

transform.toJSON(UpdateHandlerTest);
UpdateHandlerTest.track = true;
UpdateHandlerTest.defaultSort = '-createdAt';
UpdateHandlerTest.defaultColumns = 'name, email, createdAt';
UpdateHandlerTest.register();
