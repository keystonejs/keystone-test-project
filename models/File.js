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
		originalname: true,
	},
});

File.add({
	name: { type: String },
	file: { type: Types.File, storage: storage, required: true, initial: true },
});

// Optional - Test the Azure Storage adapter if environment variables are set
if (process.env.AZURE_STORAGE_ACCOUNT
	&& process.env.AZURE_STORAGE_ACCESS_KEY
	&& process.env.AZURE_STORAGE_CONTAINER
) {
	var azureStorage = new keystone.Storage({
		adapter: require('keystone-storage-adapter-azure'),
		azure: {}, // Use defaults from .env
		schema: {
			originalname: true,
			container: true,
			etag: true,
			url: true,
		},
	});
	File.add({
		azureFile: { type: Types.File, storage: azureStorage },
	});
}

// Optional - Test the S3 Storage adapter if environment variables are set
if (process.env.S3_KEY
	&& process.env.S3_SECRET
	&& process.env.S3_BUCKET
) {
	var s3storage = new keystone.Storage({
		adapter: require('keystone-storage-adapter-s3'),
		s3: {}, // Use defaults from .env
		schema: {
			originalname: true,
			bucket: true,
			etag: true,
			path: true,
			url: true,
		},
	});
	File.add({
		s3File: { type: Types.File, storage: s3storage },
	});
}

transform.toJSON(File);
File.defaultColumns = 'name, file';
File.register();
