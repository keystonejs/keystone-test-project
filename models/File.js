var keystone = require('keystone');
var transform = require('model-transform');
var path = require('path');
var Types = keystone.Field.Types;

var File = new keystone.List('File');

var storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./uploads'),
		permissionMask: 0644,
		publicUrlBase: '/public/uploads'
	},

	// generateFilename: keystone.Storage.filenameFromHash, // or filenameFromUpload filenameFromRandom

	// generateFilename: (file, i) => `${inflect.slug(file.originalName)}}`,
	// onConflict: 'retry', // 'retry' | 'overwrite' | 'error'

	// adapter: keystone.Storage.Adapters.S3({
	// 	path: 'keystone-uploads',
	// 	bucket: 'my-bucket',
	// 	accessKey: 'ABASdfasdfasd',
	// 	secretAccessKey: 'asdfasdfi87a6sdf9',
	// 	policy: 'ACL_PRIVATE',
	// 	region: 'ap-southeast-2',
	// 	filePath: (doc, filehash, originalName) => `${filehash}`,
	// 	onConflict: 'overwrite', // 'overwrite' | 'rename' | 'random' | 'ordinal',
	// }),
	// adapter: keystone.Storage.Adapters.mongoBlobStore({}),
	// adapter: keystone.Storage.Adapters.inMemory({}),
	// adapter: keystone.Storage.Adapters.redisBlobStore({ host: 'localhost', port: 6379, dbNumber: 0 }),

	// getPublicUrl(fileLocator) >> url
	// upload(file) >> fileName, fileLocator
	// download(fileLocator) >> fileStream
	// remove(fileLocator)
	// exists(filename, callback)

	// maxSize:
	// allowedMimeType:
	// allowedFilenameRegex:  // ??

	// adapter.getPublicPath()
	schema: {

		mimetype: false,
		size: false,
		originalname: true,

		// etag: true,
		// serverTime: true,
	},

});

File.add({
	name: { type: String },
	file: { type: Types.File, storage: storage, required: true, initial: true },
});

transform.toJSON(File);
File.defaultColumns = 'name, file';
File.register();
