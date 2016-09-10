var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key' },
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	heroImage: { type: Types.CloudinaryImage, required: true, initial: true },
	images: { type: Types.CloudinaryImages },
});

transform.toJSON(Gallery);
Gallery.track = true;
Gallery.register();
