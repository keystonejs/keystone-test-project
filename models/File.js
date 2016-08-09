var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var File = new keystone.List('File');

var storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./uploads'),
		publicPath: '/public/uploads/'
	},
	schema: {
		mimetype: false,
		size: false,
		originalname: true
	}
});

File.add({
	name: { type: String },
	file: { type: Types.File, storage: storage, required: true, initial: true }
});

if (process.env.S3_KEY && process.env.S3_SECRET && process.env.S3_BUCKET) {
	var s3storage = new keystone.Storage({
		adapter: keystone.Storage.Adapters.S3,
		s3: {}, // Defaults?
		schema: {
			mimetype: false,
			size: false,
			originalname: true
		}
	});

	File.add({
		s3File: { type: Types.File, storage: s3storage }
	});
}

transform.toJSON(File);
File.defaultColumns = 'name, file';
File.register();
