var keystone = require('keystone');
var transform = require('model-transform');
var path = require('path');
var Types = keystone.Field.Types;

var File = new keystone.List('File');

var UploadStore = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	path: keystone.expandPath('uploads'),
	// path: '../uploads',
	// path: path.normalize(__dirname + '/../uploads'),
	publicPath: '/files/uploads/',
	schema: {
		path: true,
		originalname: true,
	},

	// default: random, retry.

	generateFilename: keystone.Storage.filenameFromHash, // or filenameFromUpload filenameFromRandom
	// generateFilename: (item, file, i) => file.originalname,
	whenExists: 'overwrite', // 'error' 'retry'
});

File.add({
	name: { type: String },
	file: { type: Types.File, storage: UploadStore, required: true, initial: true },
});

transform.toJSON(File);
File.defaultColumns = 'name, file';
File.register();
