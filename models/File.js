var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var File = new keystone.List('File');

var storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./uploads'),
		publicPath: '/public/uploads/',
	},
	schema: {
		mimetype: false,
		size: false,
		originalname: true,
	},
});

File.add({
	name: { type: String },
	file: { type: Types.File, storage: storage, required: true, initial: true },
});

transform.toJSON(File);
File.defaultColumns = 'name, file';
File.register();
