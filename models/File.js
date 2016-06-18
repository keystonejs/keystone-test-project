var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var File = new keystone.List('File');

var UploadStore = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	path: 'uploads',
	publicPath: '/files/uploads/',
});

File.add({
	name: { type: String },
	file: { type: Types.File, storage: UploadStore, required: true, initial: true },
});

transform.toJSON(File);
File.defaultColumns = 'name, file';
File.register();
