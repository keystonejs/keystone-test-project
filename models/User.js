var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true, unique: true },
	password: { type: Types.Password, initial: true, required: true },
	company: { type: Types.Relationship, ref: 'Company', initial: true, index: true },
	address: { type: Types.Location, collapse: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	isProtected: { type: Boolean, noedit: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

/**
 * PROTECTING THE DEMO USER
 * The following hooks prevent anyone from editing the main demo user itself,
 * and breaking access to the website cms.
 */

var protect = function (path) {
	User.schema.path(path).set(value => {
		return (this.isProtected) ? this.get(path) : value;
	});
};
var protectedPaths = ['name.first', 'name.last', 'email', 'isAdmin'];
protectedPaths.forEach(protect);

User.schema.path('password').set(value => {
	return (this.isProtected) ? '$2a$10$8oUbHJPIUrW5z2aHoIGfP.q0SC5DrLDrX1qLkwhjQ3nYQ9Ay2nGPu' : value;
});

transform.toJSON(User);
User.defaultColumns = 'name, email, company, isAdmin';
User.register();
