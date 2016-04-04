var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var FieldTest = new keystone.List('FieldTest', {
	track: true,
});

FieldTest.add({
	longLabelForHeadingTesting: String,
});

FieldTest.add('Model Heading', {
	// azureFile: { type: Types.AzureFile },
	boolean: { type: Types.Boolean },
	// cloudinaryImage: { type: Types.CloudinaryImage },
	// cloudinaryImages: { type: Types.CloudinaryImages },
	code: { type: Types.Code },
	color: { type: Types.Color },
	date: { type: Types.Date },
	dateArray: { type: Types.DateArray },
	dateTime: { type: Types.Datetime },
	email: { type: Types.Email },
	embedlyPath: { type: String },
	// embedlyInfo: { type: Types.Embedly, from: 'embedlyPath' },
	geoPoint: { type: Types.GeoPoint },
	html: { type: Types.Html },
	htmlWYSIWYG: { type: Types.Html, wysiwyg: true },
	key: { type: Types.Key },
	// localFile: { type: Types.LocalFile, dest: './public/images', filename: function(item, file) { return item.id + '.' + file.extension } },
	// localFiles: { type: Types.LocalFiles, dest: './public/images', filename: function(item, file) { return item.id + '.' + file.extension } },
	location: { type: Types.Location },
	markdown: { type: Types.Markdown },
	money: { type: Types.Money },
	name: { type: Types.Name },
	number: { type: Types.Number },
	numberArray: { type: Types.NumberArray },
	password: { type: Types.Password },
	relationship: { type: Types.Relationship, ref: 'User' },
	relationshipMany: { type: Types.Relationship, ref: 'User', many: true },
	// S3File: { type: Types.S3File, label: 'S3 File' },
	select: { type: Types.Select, options: ['chocolate', 'vanilla', 'strawberry', 'caramel'] },
	text: { type: Types.Text },
	textarea: { type: Types.Textarea },
	textArray: { type: Types.TextArray },
	url: { type: Types.Url },
});

FieldTest.add('Needs Configuration', {
	// azureFile: { type: Types.AzureFile },
	// cloudinaryImage: { type: Types.CloudinaryImage },
	// cloudinaryImages: { type: Types.CloudinaryImages },
	// embedlyInfo: { type: Types.Embedly, from: 'embedlyPath' },
	// embedlyPath: { type: String },
	// localFile: { type: Types.LocalFile, dest: './public/images', filename: function(item, file) { return item.id + '.' + file.extension } },
	// localFiles: { type: Types.LocalFiles, dest: './public/images', filename: function(item, file) { return item.id + '.' + file.extension } },
	// S3File: { type: Types.S3File, label: 'S3 File' },
});

transform.toJSON(FieldTest);
FieldTest.defaultColumns = 'name, boolean, date, number, password';
FieldTest.register();
