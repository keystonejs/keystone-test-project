var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var Contact = new keystone.List('Contact');

Contact.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, index: true, unique: true },
	favouriteFlavour: { type: Types.Select, options: 'chocolate, vanilla, strawberry', index: true },
	birthday: { type: Types.Date, index: true },
	homepage: { type: Types.Url, index: true },
	favouriteWords: { type: Types.TextArray, index: true },
	favouriteNumbers: { type: Types.TextArray, index: true },
	address: { type: Types.Location, collapse: true },
	bio: { type: Types.Markdown, collapse: true },
});

transform.toJSON(Contact);
Contact.defaultColumns = 'name, email, favouriteFlavour, birthday, homepage';
Contact.register();
