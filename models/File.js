var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var File = new keystone.List('File');

File.add({
	name: { type: String },
	file: { type: Types.LocalFile, dest: 'uploads', required: true, initial: true },
});

transform.toJSON(File);
File.defaultColumns = 'name, file';
File.register();
